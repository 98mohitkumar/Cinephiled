import Hero from "components/Hero/Hero";
import UserAvatar from "components/UserAvatar/UserAvatar";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  HamburgerIcon,
  HamburgerMenu,
  Header,
  Logo,
  MobileNav,
  NavBar,
  NavLinks,
  Search,
  SearchModal
} from "./NavigationStyles";

const navLinks = [
  { text: "Home", link: "/" },
  { text: "Explore", link: "/explore" },
  { text: "About", link: "/about" }
];

const Navigation = () => {
  const router = useRouter();
  const navRef = useRef(null);
  const lastScroll = useRef();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navHandler = () => {
    if (window.scrollY > 100 && window.scrollY > lastScroll.current) {
      navRef.current?.classList.add("hide-nav");
      navRef.current?.classList.remove("show-nav");
    } else {
      navRef.current?.classList.remove("hide-nav");
      navRef.current?.classList.add("show-nav");
    }

    lastScroll.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", navHandler);
    return () => window.removeEventListener("scroll", navHandler);
  }, []);

  const hamburgerHandler = () => {
    setShowSearchModal(false);
    document.body.style.overflow = showHamburgerMenu ? "auto" : "hidden";
    setShowHamburgerMenu((prev) => !prev);
  };

  const searchHandler = () => {
    if (router.asPath === "/") {
      document.body.style.overflow = "auto";
      document
        .querySelector(".heroSearchInput")
        .scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      setShowSearchModal(true);
      document.body.style.overflow = "hidden";
    }

    setTimeout(() => {
      setShowHamburgerMenu(false);
      if (router.asPath !== "/") {
        navRef.current.classList.add("hide-nav");
        navRef.current.classList.remove("show-nav");
      }
      document.querySelector(".heroSearchInput").focus({ preventScroll: true });
    }, 100);
  };

  const closeSearchModalHandler = (e) => {
    if (!e.target.classList.contains("heroSearchInput")) {
      setShowSearchModal(false);
      document.body.style.overflow = "auto";
      navRef.current.classList.remove("hide-nav");
      navRef.current.classList.add("show-nav");
    }
  };

  return (
    <Header ref={navRef}>
      <NavBar>
        <Link href='/'>
          <div className='py-3' aria-label='cinephiled logo'>
            <Logo />
          </div>
        </Link>

        <NavLinks>
          {navLinks.map(({ text, link }) => (
            <Link href={link} key={text}>
              <div
                className={`link ${router.asPath === link ? "active" : ""}`}
                aria-label={`go to ${text} page`}>
                {text}
              </div>
            </Link>
          ))}

          <UserAvatar />

          <Search onClick={searchHandler}>
            <BsSearch size='24px' />
          </Search>
        </NavLinks>

        <MobileNav>
          <Search className='search-sm' onClick={searchHandler} key='search-icon'>
            <BsSearch size='22px' />
          </Search>

          <UserAvatar />

          <HamburgerIcon
            onClick={hamburgerHandler}
            $active={showHamburgerMenu}
            key='hamburger-menu'
          />
        </MobileNav>
      </NavBar>

      <AnimatePresence>
        {showHamburgerMenu && (
          <HamburgerMenu
            as={motion.div}
            key='hamburger-menu'
            initial={{ translateY: "-100vh" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "-100vh" }}
            transition={{
              type: "tween",
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1]
            }}>
            <div className='menu-wrapper'>
              {navLinks.map(({ text, link }) => (
                <Link href={link} key={text}>
                  <div
                    className={`navlink ${router.asPath === link ? "active" : ""}`}
                    onClick={hamburgerHandler}>
                    {text}
                  </div>
                </Link>
              ))}
            </div>
          </HamburgerMenu>
        )}

        {showSearchModal && (
          <SearchModal
            as={motion.div}
            key='search-modal'
            className='search-modal'
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: 1,
              zIndex: 500
            }}
            exit={{ opacity: 0, zIndex: 500 }}
            transition={{ duration: 0.5 }}
            onClick={closeSearchModalHandler}>
            <Hero />
          </SearchModal>
        )}
      </AnimatePresence>
    </Header>
  );
};

export default Navigation;

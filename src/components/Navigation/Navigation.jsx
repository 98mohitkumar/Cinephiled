import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HamburgerIcon, hamburgerMenu, headerStyles, Logo, navBarStyles, navLinksStyles, searchOverlayBackdrop } from "./NavigationStyles";
import GlobalSearch from "components/GlobalSearch/GlobalSearch";
import { FlexBox, LayoutContainer } from "components/Layout/helpers";
import P from "components/UI/Typography/P";
import UserAvatar from "components/UserAvatar/UserAvatar";
import { matches } from "utils/helper";

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

  useEffect(() => {
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
      const heroSearchInput = document.querySelector(".heroSearchInput");
      heroSearchInput.scrollIntoView({ behavior: "smooth", block: "end" });
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
    <header css={headerStyles} ref={navRef}>
      <LayoutContainer className='py-4' css={navBarStyles}>
        <FlexBox tag='nav' className='w-full items-center justify-between'>
          <Link href='/'>
            <div className='py-12' aria-label='cinephiled logo' role='link'>
              <Logo />
            </div>
          </Link>

          <FlexBox className='-mr-32 items-center max-sm:hidden' css={navLinksStyles}>
            {navLinks.map(({ text, link }) => (
              <Link href={link} key={text}>
                <P size='large' weight='medium' className={`link ${matches(router.asPath, link) ? "active" : ""}`} aria-label={`go to ${text} page`}>
                  {text}
                </P>
              </Link>
            ))}

            <UserAvatar />

            <FlexBox className='hover cursor-pointer items-center justify-center px-32 py-16 can-hover:text-accentPrimary' onClick={searchHandler}>
              <Search size={28} />
            </FlexBox>
          </FlexBox>

          <div className='flex items-center gap-16 sm:hidden'>
            <FlexBox
              className='hover cursor-pointer items-center justify-center p-8 can-hover:text-accentPrimary'
              onClick={searchHandler}
              key='search-icon'>
              <Search size={28} />
            </FlexBox>

            <UserAvatar />

            <HamburgerIcon onClick={hamburgerHandler} className={showHamburgerMenu ? "active" : ""} />
          </div>
        </FlexBox>
      </LayoutContainer>

      <AnimatePresence>
        {showHamburgerMenu && (
          <motion.div
            css={hamburgerMenu}
            key='hamburger-menu'
            initial={{ translateY: "-100vh" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "-100vh" }}
            transition={{
              type: "tween",
              duration: 0.75,
              ease: [0.77, 0, 0.175, 1]
            }}
            className='block sm:hidden'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              {navLinks.map(({ text, link }) => (
                <Link href={link} key={text}>
                  <P
                    className={`navlink ${matches(router.asPath, link) ? "active" : ""} px-20 py-16 text-h4Static`}
                    weight='semibold'
                    onClick={hamburgerHandler}>
                    {text}
                  </P>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {showSearchModal && (
          <motion.div
            css={searchOverlayBackdrop}
            key='search-modal'
            initial={{ opacity: 0.5 }}
            animate={{
              opacity: 1,
              zIndex: 500
            }}
            exit={{ opacity: 0, zIndex: 500 }}
            transition={{ duration: 0.325 }}
            onClick={closeSearchModalHandler}>
            <FlexBox className='h-[500px] items-center justify-center'>
              <GlobalSearch />
            </FlexBox>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;

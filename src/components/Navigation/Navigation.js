import {
  HamburgerIcon,
  HamburgerMenu,
  Header,
  Logo,
  NavBar
} from './NavigationStyles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useCallback } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { text: 'Home', link: '/' },
  // { text: 'Profile', link: '/profile' },
  { text: 'About', link: '/about' }
];

const Navigation = () => {
  const router = useRouter();
  const navRef = useRef(null);
  const lastScroll = useRef();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    const navHandler = () => {
      if (window.scrollY > 100 && window.scrollY > lastScroll.current) {
        navRef.current.classList.add('hide-nav');
        navRef.current.classList.remove('show-nav');
      } else {
        navRef.current.classList.remove('hide-nav');
        navRef.current.classList.add('show-nav');
      }

      lastScroll.current = window.scrollY;
    };

    window.addEventListener('scroll', navHandler);
    return () => window.removeEventListener('scroll', navHandler);
  }, []);

  const searchHandler = useCallback(() => {
    if (router.asPath === '/') {
      document.querySelector('.heroSearchInput').focus();
    }
  }, [router.asPath]);

  const hamburgerHandler = useCallback(() => {
    document.body.style.overflow = showHamburgerMenu ? 'auto' : 'hidden';
    setShowHamburgerMenu((prev) => !prev);
  }, [showHamburgerMenu]);

  return (
    <Header>
      <NavBar ref={navRef}>
        <Link href='/'>
          <a>
            <div className='py-3'>
              <Logo />
            </div>
          </a>
        </Link>
        <div className='nav-links'>
          {navLinks.map(({ text, link }) => (
            <Link href={link} key={text}>
              <a
                className={`navlink ${router.asPath === link ? 'active' : ''}`}
              >
                {text}
              </a>
            </Link>
          ))}

          {router.asPath === '/' && (
            <div className='search' onClick={searchHandler}>
              <BsSearch size='1.25rem' />
            </div>
          )}
        </div>

        <div className='mobile-nav'>
          {router.asPath === '/' && (
            <div
              className='search search-sm d-flex align-items-center'
              onClick={searchHandler}
            >
              <BsSearch size='1.5rem' />
            </div>
          )}

          {/* hamburger icon */}
          <HamburgerIcon
            onClick={hamburgerHandler}
            active={showHamburgerMenu}
          />
        </div>
      </NavBar>

      {/* hamburger menu */}
      <AnimatePresence>
        {showHamburgerMenu && (
          <HamburgerMenu
            as={motion.div}
            initial={{ translateY: '-100vh' }}
            animate={{
              translateY: 0,
              transition: {
                type: 'tween',
                duration: 0.8,
                ease: [0.77, 0, 0.175, 1]
              }
            }}
            exit={{
              translateY: '-100vh',
              transition: {
                type: 'tween',
                duration: 1,
                ease: [0.77, 0, 0.175, 1]
              }
            }}
          >
            <div className='menu-wrapper'>
              {navLinks.map(({ text, link }) => (
                <Link href={link} key={text}>
                  <a
                    className={`navlink ${
                      router.asPath === link ? 'active' : ''
                    }`}
                    onClick={hamburgerHandler}
                  >
                    {text}
                  </a>
                </Link>
              ))}
            </div>
          </HamburgerMenu>
        )}
      </AnimatePresence>
    </Header>
  );
};

export default Navigation;

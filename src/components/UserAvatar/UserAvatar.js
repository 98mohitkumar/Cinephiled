import { useLogout } from "api/auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useUserContext } from "Store/UserContext";
import { Avatar, DefaultAvatar, Popup, PopupOption } from "./UserAvatarStyles";

const UserAvatar = () => {
  const { logout } = useLogout();
  const router = useRouter();
  const { userInfo } = useUserContext();
  const [showPopup, setShowPopup] = useState(false);

  const userAvatar = userInfo?.avatar
    ? {
        type: userInfo?.avatar?.tmdb?.avatar_path ? "tmdb" : "hash",
        avatar: userInfo?.avatar?.tmdb?.avatar_path ?? userInfo?.avatar?.gravatar?.hash
      }
    : { type: "hash", avatar: "icon" };

  useEffect(() => {
    const hidePopup = (e) => {
      if (e.target.className === "avatar") {
        return;
      }

      setShowPopup(false);
    };

    window.addEventListener("click", hidePopup);
    window.addEventListener("scroll", hidePopup);

    return () => {
      window.removeEventListener("click", hidePopup);
      window.removeEventListener("scroll", hidePopup);
    };
  });

  return (
    <Fragment>
      {userInfo?.accountId ? (
        <Avatar avatar={userAvatar}>
          <div className='avatar' onClick={() => setShowPopup((prev) => !prev)} />

          <AnimatePresence exitBeforeEnter>
            {showPopup && (
              <Popup
                as={motion.div}
                initial={{ opacity: 0, translateY: "10px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                exit={{ opacity: 0, translateY: "10px" }}
                transition={{
                  type: "tween",
                  duration: 0.45,
                  ease: [0.77, 0, 0.175, 1]
                }}>
                <Link href='/profile' passHref>
                  <PopupOption className='font-semibold' role='button'>
                    {userInfo?.name || userInfo?.username}
                    <p className='sub-text'>view profile</p>
                  </PopupOption>
                </Link>
                <Link href='/lists' passHref>
                  <PopupOption role='button'>Lists</PopupOption>
                </Link>
                <PopupOption onClick={logout} role='button'>
                  Logout
                </PopupOption>
              </Popup>
            )}
          </AnimatePresence>
        </Avatar>
      ) : (
        <DefaultAvatar>
          <div className='desktop-login'>
            <Link href='/login'>
              <a className={`link ${router.asPath === "/login" ? "active" : ""}`}>Login</a>
            </Link>
          </div>

          <div className='mobile-login'>
            <Link href='/login'>
              <a className='link'>
                <FaRegUser size='24px' />
              </a>
            </Link>
          </div>
        </DefaultAvatar>
      )}
    </Fragment>
  );
};

export default UserAvatar;

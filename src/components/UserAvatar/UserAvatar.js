import { useLogout } from "api/auth";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useUserContext } from "Store/UserContext";
import { Avatar, DefaultAvatar, Popup, PopupOption } from "./UserAvatarStyles";

const UserAvatar = () => {
  const { logout } = useLogout();
  const { status } = useSession();
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

  if (!userInfo?.accountId && (status === "loading" || status === "authenticated")) return null;

  return (
    <Fragment>
      {userInfo?.accountId ? (
        <Avatar $avatar={userAvatar}>
          <div className='avatar' onClick={() => setShowPopup((prev) => !prev)} />

          <AnimatePresence mode='wait'>
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
                  <PopupOption className='font-semibold border-b border-neutral-600' role='button'>
                    {userInfo?.name || userInfo?.username}
                    <p className='sub-text'>view profile</p>
                  </PopupOption>
                </Link>
                <Link href='/lists' passHref>
                  <PopupOption role='button' className='border-b border-neutral-600'>
                    Lists
                  </PopupOption>
                </Link>
                <PopupOption
                  onClick={logout}
                  role='button'
                  className='text-red-500 font-semibold logout'>
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
              <div
                className={`link ${router.asPath === "/login" ? "active" : ""}`}
                aria-label='Login'>
                Login
              </div>
            </Link>
          </div>

          <div className='mobile-login'>
            <Link href='/login'>
              <div className='link' aria-label='Login'>
                <FaUserAlt size='24px' />
              </div>
            </Link>
          </div>
        </DefaultAvatar>
      )}
    </Fragment>
  );
};

export default UserAvatar;

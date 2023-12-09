import { useLogout } from "api/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useContext, useMemo, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { UserContext } from "Store/UserContext";
import { Avatar, DefaultAvatar, Popup, PopupOption } from "./UserAvatarStyles";

const UserAvatar = () => {
  const { logout } = useLogout();
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const { status } = useSession();
  const [showPopup, setShowPopup] = useState(false);

  const userAvatar = useMemo(
    () =>
      userInfo?.avatar
        ? {
            type: userInfo?.avatar?.tmdb?.avatar_path ? "tmdb" : "hash",
            avatar: userInfo?.avatar?.tmdb?.avatar_path ?? userInfo?.avatar?.gravatar?.hash
          }
        : { type: "hash", avatar: "icon" },
    [userInfo?.avatar]
  );

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
      {status !== "loading" && (
        <Fragment>
          {status === "authenticated" ? (
            <Avatar avatar={userAvatar}>
              <div className='avatar' onClick={() => setShowPopup((prev) => !prev)} />

              <AnimatePresence exitBeforeEnter>
                {showPopup && (
                  <Popup
                    as={motion.div}
                    initial={{ opacity: 0, translateY: "10px" }}
                    animate={{
                      opacity: 1,
                      translateY: "0px",
                      transition: {
                        type: "tween",
                        duration: 0.45,
                        ease: [0.77, 0, 0.175, 1]
                      }
                    }}
                    exit={{
                      opacity: 0,
                      translateY: "10px",
                      transition: {
                        type: "tween",
                        duration: 0.45,
                        ease: [0.77, 0, 0.175, 1]
                      }
                    }}>
                    <Link href='/profile' passHref>
                      <PopupOption className='font-semibold' role='button'>
                        {userInfo?.username}
                        <p className='sub-text'>view profile</p>
                      </PopupOption>
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
      )}
    </Fragment>
  );
};

export default UserAvatar;

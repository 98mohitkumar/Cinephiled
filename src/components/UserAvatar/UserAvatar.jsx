import { UserRound } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef, useState } from "react";

import { useLogout } from "apiRoutes/auth";
import FlexBox from "components/UI/FlexBox";
import P from "components/UI/Typography/P";
import { ROUTES } from "data/global";
import { useUserContext } from "Store/UserContext";

import { popupOption, avatar, popup } from "./UserAvatarStyles";

const UserAvatar = () => {
  const router = useRouter();
  const { logout } = useLogout();
  const { userInfo } = useUserContext();
  const avatarRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  const userAvatar = userInfo?.avatar
    ? {
        type: userInfo?.avatar?.tmdb?.avatar_path ? "tmdb" : "hash",
        src: userInfo?.avatar?.tmdb?.avatar_path || userInfo?.avatar?.gravatar?.hash
      }
    : { type: "hash", src: "icon" };

  useEffect(() => {
    const hidePopup = (e) => {
      if (showPopup && avatarRef.current && !avatarRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };

    window.addEventListener("click", hidePopup);
    return () => {
      window.removeEventListener("click", hidePopup);
    };
  }, [showPopup]);

  return (
    <Fragment>
      {userInfo?.accountId ? (
        <FlexBox className='relative items-end justify-center p-8 lg:px-32'>
          <div $avatar={userAvatar} css={avatar} ref={avatarRef} role='button' onClick={() => setShowPopup((prev) => !prev)} />

          <AnimatePresence mode='wait'>
            {showPopup && (
              <motion.div
                css={popup}
                initial={{ opacity: 0, translateY: "10px" }}
                animate={{ opacity: 1, translateY: "0px" }}
                exit={{ opacity: 0, translateY: "10px" }}
                transition={{
                  type: "tween",
                  duration: 0.45,
                  ease: [0.77, 0, 0.175, 1]
                }}
                className='drop-shadow-xl'>
                <Link href={`/${ROUTES.profile}`} passHref>
                  <div css={popupOption} className='border-b border-neutral-700 font-semibold' role='button'>
                    {userInfo?.name || userInfo?.username}
                    <P size='tiny' className='text-neutral-400'>
                      View Profile
                    </P>
                  </div>
                </Link>
                <Link href={`/${ROUTES.lists}`} passHref>
                  <div role='button' css={popupOption} className='border-b border-neutral-700'>
                    Lists
                  </div>
                </Link>
                <div css={popupOption} onClick={logout} role='button' className='logout font-semibold text-red-500'>
                  Logout
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FlexBox>
      ) : (
        <Fragment>
          <Link href={`/${ROUTES.login}`} className='hidden lg:block'>
            <P size='large' weight='medium' className={`link ${router.asPath === "/login" ? "active" : ""}`} aria-label='Login'>
              Login
            </P>
          </Link>

          <Link href={`/${ROUTES.login}`} className='block p-8 lg:hidden'>
            <div className='link' aria-label='Login'>
              <UserRound size={28} />
            </div>
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UserAvatar;

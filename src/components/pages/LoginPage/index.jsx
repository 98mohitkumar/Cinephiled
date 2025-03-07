import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Fragment, useEffect } from "react";

import { useLogin } from "apiRoutes/auth";
import MetaWrapper from "components/Shared/MetaWrapper";
import Button from "components/UI/Button";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H3 from "components/UI/Typography/H3";
import P from "components/UI/Typography/P";
import { ROUTES, blurPlaceholder, siteInfo } from "data/global";
import posters from "images/posters.webp";
import logo from "public/logo512.png";

import { LoginCardStyles, pageWrapperStyles } from "./LoginPageStyles";

const LoginPage = () => {
  const router = useRouter();
  const { login, error, errorMessage, setError, isWaiting, setIsWaiting } = useLogin();

  // generate session after redirect
  useEffect(() => {
    const { query } = router;
    const { approved } = query;

    const request_token = sessionStorage.getItem("request_token");

    const generateSession = async () => {
      const apiRes = await signIn("tmdb", {
        redirect: false,
        requestToken: request_token
      });

      if (apiRes?.ok && apiRes?.status === 200) {
        router.replace("/profile");
      } else {
        setError({ error: true, message: apiRes?.error });
      }
    };

    if (approved === "true" && request_token) {
      setIsWaiting(true);
      generateSession();
    }
  }, [router, setError, setIsWaiting]);

  return (
    <Fragment>
      <MetaWrapper title='Login - Cinephiled' description='Cinephiled login page' url={`${siteInfo.url}/${ROUTES.login}`} />

      <div css={pageWrapperStyles}>
        <Image
          src={posters}
          fill
          alt='login-page-background'
          style={{ objectFit: "cover" }}
          priority
          className='background'
          placeholder='blur'
          blurDataURL={blurPlaceholder}
        />

        <LayoutContainer className='relative z-10 grid place-items-center'>
          <FlexBox
            className='flex-col items-center justify-center gap-1624 overflow-hidden rounded-xl border border-neutral-700 bg-black p-2032 shadow-xl'
            css={LoginCardStyles}>
            <FlexBox className='items-center justify-center gap-24'>
              <Image
                src={logo}
                width={85}
                height={50}
                alt='cinephiled-logo'
                priority
                className='h-14 object-cover'
                placeholder='blur'
                blurDataURL={blurPlaceholder}
              />

              <H3 tag='p' weight='semibold'>
                +
              </H3>

              <Image
                src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
                width={100}
                height={40}
                alt='tmdb-logo'
                priority
              />
            </FlexBox>

            <FlexBox className='flex-col items-center justify-center gap-16 text-center'>
              <P size='large'>
                To unlock powerful features such as rating, favoriting, adding to watchlist, and creating custom lists, please log in with your TMDB
                account.
              </P>

              <FlexBox className='flex-col items-center gap-12'>
                <Button onClick={login} disabled={isWaiting}>
                  {isWaiting ? "Authenticating..." : "Login with TMDB"}
                </Button>

                {error && <P className='text-red-500'>{errorMessage || "Something went wrong, please try again."}</P>}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </LayoutContainer>
      </div>
    </Fragment>
  );
};

export default LoginPage;

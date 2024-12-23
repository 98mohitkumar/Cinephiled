import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { Fragment, useEffect } from "react";

import { useLogin } from "apiEndpoints/auth";
import MetaWrapper from "components/Shared/MetaWrapper";
import posters from "images/posters.webp";
import logo from "public/logo512.png";
import { AboutBackground, Button } from "styles/GlobalComponents";

import { Integration, LoginCard, LoginContainer, LoginText } from "./LoginPageStyles";

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
      <MetaWrapper title='Login - Cinephiled' description='Cinephiled login page' url='https://cinephiled.vercel.app/login' />
      <LoginContainer className='login-container mb-auto'>
        <div className='bg-wrapper'>
          <AboutBackground className='loginPage'>
            <Image src={posters} fill alt='about-login-background' style={{ objectFit: "cover" }} priority />
          </AboutBackground>
        </div>

        {/* login card */}
        <LoginCard>
          <Integration>
            <Image src={logo} width={85} height={50} alt='cinephiled-logo' priority />

            <p className='m-0 text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem]'>+</p>

            <Image
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
              width={100}
              height={40}
              alt='cinephiled-logo'
              priority
            />
          </Integration>

          <div className='flex w-full justify-center'>
            <div>
              <LoginText className='mb-4 block'>
                To unlock powerful features such as rating, favoriting, adding to watchlist, and creating custom lists, please log in with your TMDB
                account.
              </LoginText>

              <div className='flex flex-col items-center'>
                <Button onClick={login} className='mt-3' loading={+isWaiting}>
                  {isWaiting ? "Authenticating..." : "Login with TMDB"}
                </Button>

                {error && <p className='pt-3 m-0 text-red-500'>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </LoginCard>
      </LoginContainer>
    </Fragment>
  );
};

export default LoginPage;

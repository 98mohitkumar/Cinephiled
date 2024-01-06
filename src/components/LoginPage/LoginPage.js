import { useLogin } from "api/auth";
import MetaWrapper from "components/MetaWrapper";
import posters from "images/posters.webp";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import logo from "public/logo512.png";
import { Fragment, useEffect } from "react";
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
      <MetaWrapper
        title='Login - Cinephiled'
        description='Cinephiled login page'
        url='https://cinephiled.vercel.app/login'
      />
      <LoginContainer className='mb-auto login-container'>
        <div className='bg-wrapper'>
          <AboutBackground className='loginPage'>
            <Image
              src={posters}
              layout='fill'
              alt='about-login-background'
              objectFit='cover'
              priority
            />
          </AboutBackground>
        </div>

        {/* login card */}
        <LoginCard>
          <Integration>
            <Image
              src={logo}
              width='85px'
              height='50px'
              alt='cinephiled-logo'
              objectFit='cover'
              priority
            />

            <p className='text-[calc(1.375rem_+_1.5vw)] xl:text-[2.5rem] m-0'>+</p>

            <Image
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
              width='100px'
              height='40px'
              alt='cinephiled-logo'
              objectFit='contain'
              priority
            />
          </Integration>

          <div className='flex w-full justify-center'>
            <div>
              <LoginText className='block mb-4'>
                In order to use the rating capabilities of Cinephiled, as well as using watchlist
                feature you will need to login with your TMDB account.
              </LoginText>

              <div className='flex flex-col items-center'>
                <Button onClick={login} className='mt-3' loading={+isWaiting}>
                  {isWaiting ? "Authenticating..." : "Login with TMDB"}
                </Button>

                {error && <p className='text-red-500 m-0 pt-3'>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </LoginCard>
      </LoginContainer>
    </Fragment>
  );
};

export default LoginPage;

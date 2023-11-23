import { useLogin } from "api/auth";
import MetaWrapper from "components/MetaWrapper";
import posters from "images/posters.webp";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "public/logo512.png";
import { Fragment, useEffect } from "react";
import { AboutBackground } from "styles/GlobalComponents";
import { Integration, LoginButton, LoginCard, LoginContainer, LoginText } from "./LoginPageStyles";

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

  // form submission handler
  // const formHandler = async (e) => {
  //   e.preventDefault();
  //   setIsWaiting(true);
  //   const formData = new FormData(e.target);

  //   const payload = {
  //     username: formData.get("username"),
  //     password: formData.get("password")
  //   };

  //   if (payload?.username.trim().length > 0 && payload?.password.trim().length > 0) {
  //     await login({ withCredentials: true, payload });
  //   } else {
  //     e.target.reset();
  //   }
  // };

  return (
    <Fragment>
      <MetaWrapper
        title='Login - Cinephiled'
        description='Cinephiled login page'
        url='https://cinephiled.vercel.app/login'
      />
      <LoginContainer className='mb-auto'>
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

            <p className='fs-1 m-0'>+</p>

            <Image
              src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'
              width='100px'
              height='40px'
              alt='cinephiled-logo'
              objectFit='contain'
              priority
            />
          </Integration>

          <div className='d-flex w-100 justify-content-center'>
            <div>
              <LoginText className='d-block mb-4'>
                In order to use the rating capabilities of Cinephiled, as well as using watchlist
                feature you will need to login with your TMDB account.
              </LoginText>

              <div className='d-flex flex-column align-items-center'>
                {/* <LoginButton onClick={() => setShowForm(true)}>
                      Login with credentials
                    </LoginButton> */}

                <LoginButton onClick={login} className='secondary' isWaiting={isWaiting}>
                  {isWaiting ? "Authenticating..." : "Login with TMDB"}
                </LoginButton>

                {error && <p className='text-danger m-0 pt-3'>{errorMessage}</p>}
              </div>
            </div>

            {/* <AnimatePresence exitBeforeEnter>
              {showForm && (
                <motion.div
                  initial={{ display: "none", opacity: 0 }}
                  animate={{
                    opacity: 1,
                    display: "block",
                    transition: {
                      type: "tween",
                      delay: 0.6,
                      duration: 0.6,
                      ease: [0.77, 0, 0.175, 1]
                    }
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      type: "tween",
                      duration: 0.6,
                      ease: [0.77, 0, 0.175, 1]
                    }
                  }}
                  className='w-100'>
                  <form onSubmit={formHandler}>
                    <div className='mb-3'>
                      <input
                        type='text'
                        className='form-control loginInputs'
                        name='username'
                        id='username'
                        placeholder='Username'
                        onChange={() => {
                          clearError();
                          setIsWaiting(false);
                        }}
                        required
                      />
                    </div>

                    <div className='mb-4'>
                      <input
                        type='password'
                        name='password'
                        className='form-control loginInputs'
                        id='password'
                        placeholder='Password'
                        onChange={() => {
                          clearError();
                          setIsWaiting(false);
                        }}
                        required
                      />
                    </div>

                    {error && <p className='text-danger mb-3'>{errorMessage}</p>}

                    <LoginButton
                      type='submit'
                      className='login-with-cred-Button mb-2'
                      isWaiting={isWaiting && !error}>
                      {isWaiting && !error ? "Authenticating..." : "Login"}
                    </LoginButton>

                    <LoginButton
                      onClick={(e) => {
                        e.preventDefault();
                        setShowForm(false);
                      }}
                      className='login-with-cred-Button secondary'>
                      Go Back
                    </LoginButton>

                    <p className='text-center mb-0 mt-3'>
                      <a
                        href='https://www.themoviedb.org/signup'
                        target='_blank'
                        rel='noreferrer'
                        className='signup'>
                        Don&apos;t have a TMDB account?
                      </a>
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence> */}
          </div>
        </LoginCard>
      </LoginContainer>
    </Fragment>
  );
};

export default LoginPage;

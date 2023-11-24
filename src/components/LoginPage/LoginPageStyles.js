import styled from "styled-components";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 2rem 4.2vw;
  background-color: rgb(18 18 18 /0.95);
  position: relative;

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 0rem 1.25rem;
  }

  .bg-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    margin: auto;
    overflow: hidden;
    z-index: -1;
  }
`;

export const LoginText = styled.span`
  font-size: 1.25rem;
  text-align: center;
`;

export const LoginCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  min-width: clamp(370px, 90vw, 500px);
  padding: 1.75rem;
  gap: 2rem;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(80, 80, 80, 0.45);
  background: rgba(18, 18, 18);
  box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1.25rem;
  }

  .signup {
    color: ${(props) => props.theme.colors.accent2};

    &:hover {
      text-decoration: underline;
    }
  }

  .login-with-cred-Button {
    max-width: 100%;
    font-size: 1.1rem;
  }

  .loginInputs {
    border: none;
    border-bottom: 1px solid grey;
    box-shadow: none;
    position: relative;
    border-radius: 0;
    height: 35px;
    padding: 0px 5px;
    background-color: transparent;
    margin: auto;
    font-weight: 400;
    color: white;
    font-family: "Manrope", sans-serif;

    &:-webkit-autofill {
      box-shadow: 0 0 0 30px #121212 inset !important;
      -webkit-box-shadow: 0 0 0 30px #121212 inset !important;
      -webkit-text-fill-color: white !important;
      transition: color ease-out, background-color ease-out;
      -webkit-transition: color ease-out, background-color ease-out;
      transition-delay: 9999s;
      -webkit-transition-delay: 9999s;
    }

    &::placeholder {
      color: grey;
      font-weight: 400;
      font-family: "Manrope", sans-serif;
    }

    &:focus {
      background-color: transparent;
      box-shadow: none;
      color: white;
      border-color: white;
    }
  }
`;

export const Integration = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const LoginButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  max-width: 250px;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  background: rgb(221, 221, 221);

  ${({ isWaiting }) => isWaiting && "pointer-events: none"};

  &.secondary {
    background-color: transparent;
    color: white;
    border: 1px solid rgb(81 81 81 / 0.8);
    margin-top: 12px;
  }
`;

import styled from 'styled-components';

export const Banner = styled.div`
  width: 100%;
  height: 30vh;
  max-height: 400px;
  min-height: 300px;
  position: relative;
  display: grid;
  place-items: center;

  .BG {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: 5;
    background: url('/Images/profileBG.jpg') no-repeat center 75% / cover;
    filter: brightness(60%);
  }

  .on-top {
    z-index: 100;
    padding: 1.25rem;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 102%;
    inset: 0;
    margin: auto;
    z-index: 10;
    backdrop-filter: blur(2px);
    background: -moz-linear-gradient(
      270deg,
      rgba(31, 31, 31, 0.5) 0%,
      rgba(18, 18, 18, 1) 95%
    );
    background: -webkit-linear-gradient(
      270deg,
      rgba(31, 31, 31, 0.5) 0%,
      rgba(18, 18, 18, 1) 95%
    );
    background: linear-gradient(
      180deg,
      rgba(31, 31, 31, 0.5) 0%,
      rgba(18, 18, 18, 1) 95%
    );
  }

  .profile {
    gap: 1.5rem;
  }
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ avatar }) =>
      avatar.type === 'tmdb'
        ? `url(https://www.themoviedb.org/t/p/w100_and_h100_face${avatar.avatar})`
        : `url(https://avatars.dicebear.com/api/identicon/${avatar.avatar}.svg?b=%23121212)`}
    center center / contain;
  box-shadow: 0px 0px 5px 2px hsla(0, 0%, 0%, 0.14),
    0px 0px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 0px 8px -4px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.sm} {
    width: 65px;
    height: 65px;
  }
`;

export const ProfileStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem clamp(2.5rem, 6vw, 3.25rem);
  margin-top: 2rem;

  h4.text {
    font-size: 20px;

    @media only ${(props) => props.theme.breakpoints.xs} {
      font-size: 16px;
    }
  }
`;

export const CTAButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;
  background: rgb(221, 221, 221);

  &.secondary {
    background-color: transparent;
    color: white;
    border: 1px solid rgb(81 81 81 / 0.8);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1rem;
  }
`;

export const ConfirmationModal = styled.div`
  background-color: rgb(18 18 18 / 0.75);
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 1000;
  display: grid;
  place-items: center;

  @media only ${(props) => props.theme.breakpoints.sm} {
    place-items: flex-end center;
    padding-bottom: 2rem;
  }
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: clamp(360px, 90vw, 500px);
  padding: 1.75rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(80, 80, 80, 0.75);
  background: rgba(18, 18, 18);
  box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
    0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1.25rem;
  }

  & > * {
    line-height: 1.4;
  }
`;

export const RatingOverlay = styled.div`
  min-width: 35px;
  height: 25px;
  background: rgb(221 221 221 / 0.9);
  padding: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 6px;
  gap: 3px;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2rem rgb(12 12 12 /0.4);
  transition: all 0.25s ease-in-out;
  color: #121212;
`;

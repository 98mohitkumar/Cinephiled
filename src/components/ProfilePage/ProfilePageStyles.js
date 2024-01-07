import styled from "styled-components";

export const Banner = styled.div`
  width: 100%;
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
    background: url("/Images/profileBG.jpg") no-repeat center 75% / cover;
    filter: brightness(60%);
  }

  .on-top {
    z-index: 100;
    padding: 1.25rem;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 102%;
    inset: 0;
    margin: auto;
    z-index: 10;
    backdrop-filter: blur(2px);
    background: linear-gradient(180deg, rgba(31, 31, 31, 0.5) 0%, rgba(18, 18, 18, 1) 95%);
  }

  .profile {
    gap: 8px;
  }
`;

export const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ avatar }) =>
      avatar.type === "tmdb"
        ? `url(https://www.themoviedb.org/t/p/w100_and_h100_face${avatar.avatar})`
        : `url(https://api.dicebear.com/6.x/bottts/svg?seed=${avatar.avatar})`}
    center center / contain;
  filter: drop-shadow(
    0px 0px 5px 2px hsla(0, 0%, 0%, 0.14),
    0px 0px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 0px 8px -4px hsla(0, 0%, 0%, 0.2)
  );

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

  &.media-page {
    position: static;
    padding: 0;
    height: auto;
    background: transparent;
    box-shadow: none;
    min-width: unset;
    align-items: center;

    .text {
      font-size: 16px;
      line-height: 0.8;
    }
  }
`;

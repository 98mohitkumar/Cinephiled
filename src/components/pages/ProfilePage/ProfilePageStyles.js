import styled, { css } from "styled-components";

import { theme } from "theme/theme";
import { cssClamp } from "utils/mixins";

export const bannerStyles = css`
  width: 100%;
  min-height: 325px;
  position: relative;
  display: grid;
  place-items: center;

  .banner-background {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    margin: auto;
    z-index: ${theme.zIndex[5]};
    background: url("/images/media-backdrops.jpg") no-repeat center center / cover;
    filter: brightness(50%);
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 102%;
    inset: 0;
    z-index: 10;
    backdrop-filter: blur(1px);
    background: ${`linear-gradient(0deg, ${theme.colors.black} 0%, ${theme.colors.transparent} 100%)`};
  }
`;

export const ProfileAvatar = styled.div`
  width: ${cssClamp({ minSize: 65, maxSize: 80 })};
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: ${({ $avatar }) =>
      $avatar.type === "tmdb"
        ? `url(https://www.themoviedb.org/t/p/w100_and_h100_face${$avatar.avatar})`
        : `url(https://api.dicebear.com/6.x/bottts/svg?seed=${$avatar.avatar})`}
    center center / contain;
  filter: drop-shadow(0px 0px 5px 2px hsla(0, 0%, 0%, 0.14), 0px 0px 22px 4px hsla(0, 0%, 0%, 0.12), 0px 0px 8px -4px hsla(0, 0%, 0%, 0.2));
`;

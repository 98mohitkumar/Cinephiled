import { css, keyframes } from "styled-components";

import { theme } from "theme/theme";

const scrollUp = keyframes`
  0% {
    transform: translateY(-88%);
  }

  40% {
    transform: translateY(-5%);
  }

  80% {
    transform: translateY(-88%);
  }

  100% {
    transform: translateY(-88%);
  }
`;

const scrollDown = keyframes`
  0% {
    transform: translateY(-14.7%);
  }

  50% {
    transform: translateY(-88%);
  }

  80% {
    transform: translateY(-14.7%);
  }

  100% {
    transform: translateY(-14.7%);
  }
`;

const rotation = keyframes`
    20%, 100% {
      transform: rotate(180deg);
    }
`;

export const loaderStyles = css`
  position: fixed;
  z-index: ${theme.zIndex.modal + 1000};
  background: ${theme.colors.black};
  inset: 0;
  margin: auto;
  display: grid;
  place-items: center;

  &.small {
    position: static;
    background: transparent;
  }

  .loader {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    height: 56px;
    width: 200px;
    overflow: hidden;
  }

  .carousel {
    width: 100%;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation-delay: 2s;
  }

  .icon {
    display: flex;
    width: 100%;
    aspect-ratio: 1;
  }

  .loader .carousel:nth-child(1) {
    animation: ${scrollUp} 2.75s infinite ease-in-out;
  }

  .loader .carousel:nth-child(2) {
    animation: ${scrollDown} 2.75s infinite ease-in-out;
  }

  .loader .carousel:nth-child(3) {
    animation: ${scrollDown} 2.75s infinite ease-in-out;
  }

  .love {
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z" fill="white"/></svg>')
      no-repeat center/contain;
    animation-delay: 2s;
  }

  .death {
    align-items: center;
    justify-content: center;
    animation: ${rotation} 2.25s 1s infinite ease-in-out;
  }

  .death:after {
    content: "";
    height: 63px;
    position: absolute;
    border-left: 12px solid ${theme.colors.white};
    transform: rotate(45deg);
    border-radius: 8px;
  }

  .death:before {
    content: "";
    height: 60px;
    position: absolute;
    border-left: 12px solid ${theme.colors.white};
    transform: rotate(-45deg);
  }

  .robots {
    justify-content: space-between;
    background-color: ${theme.colors.white};
    border-radius: 0 8px 8px;
    padding: 8px;
  }

  .robots::after,
  .robots::before {
    content: "";
    width: 12px;
    height: 12px;
    background-color: ${theme.colors.black};
    border-radius: 50%;
  }
`;

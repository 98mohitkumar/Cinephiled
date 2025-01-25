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

const spinner = keyframes`
    0%,
    10%,
    20%,
    30%,
    50%,
    60%,
    70%,
    80%,
    90%,
    100% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    }

    50% {
      transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
    }
`;

export const loadingSpinner = css`
  width: 80px;
  aspect-ratio: 1;
  position: relative;
  display: grid;
  place-items: center;

  & div {
    width: 6%;
    height: 20%;
    position: absolute;
    background-color: currentColor;
    transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    animation: ${spinner} 1s calc(var(--delay) * 1s) infinite ease;
  }

  & div:nth-child(1) {
    --delay: 0.1;
    --rotation: 36;
    --translation: 150;
  }

  & div:nth-child(2) {
    --delay: 0.2;
    --rotation: 72;
    --translation: 150;
  }

  & div:nth-child(3) {
    --delay: 0.3;
    --rotation: 108;
    --translation: 150;
  }

  & div:nth-child(4) {
    --delay: 0.4;
    --rotation: 144;
    --translation: 150;
  }

  & div:nth-child(5) {
    --delay: 0.5;
    --rotation: 180;
    --translation: 150;
  }

  & div:nth-child(6) {
    --delay: 0.6;
    --rotation: 216;
    --translation: 150;
  }

  & div:nth-child(7) {
    --delay: 0.7;
    --rotation: 252;
    --translation: 150;
  }

  & div:nth-child(8) {
    --delay: 0.8;
    --rotation: 288;
    --translation: 150;
  }

  & div:nth-child(9) {
    --delay: 0.9;
    --rotation: 324;
    --translation: 150;
  }

  & div:nth-child(10) {
    --delay: 1;
    --rotation: 360;
    --translation: 150;
  }
`;

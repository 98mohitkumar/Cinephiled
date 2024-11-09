import styled from "styled-components";

export const PseudoTrack = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  height: 2px;
  width: calc(100% - 32.1vw);
  margin: auto;
  position: relative;
  top: -4px;
  z-index: -10;

  @media only ${({ theme }) => theme.breakpoints.xl} {
    display: none;
  }
`;

export const OverFlowWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1rem;
  max-width: 100%;
  overflow-x: auto;
  padding-right: 1.5rem;

  &::-webkit-scrollbar-track {
    margin-inline: 16vw;
  }

  @media only ${({ theme }) => theme.breakpoints.xl} {
    padding-bottom: 0px;

    &::-webkit-scrollbar {
      display: none;
    }

    /* for firefox */
    scrollbar-width: none;
  }
`;

export const GenreBG = styled.a`
  min-width: 180px;
  width: calc(100% / 6);
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 8px;
  padding: 24px;
  aspect-ratio: 1/0.5;
  position: relative;
  display: grid;
  place-items: center;
  transition: letter-spacing 0.325s cubic-bezier(0.77, 0, 0.175, 1);
  background: ${({ theme }) => `linear-gradient(200deg,${theme.colors.accent1}, ${theme.colors.accent2}, ${theme.colors.accent3})`};
  overflow: hidden;

  .title {
    text-align: center;
    z-index: 2;
    font-weight: 600;
    color: white;
    font-size: clamp(1.15rem, 1.6vw, 1.75rem);
  }

  &::after {
    content: "";
    inset: 0;
    background: linear-gradient(0deg, black 0%, transparent);
    opacity: 0.3;
    position: absolute;
    z-index: 1;
  }

  &:hover {
    letter-spacing: 2px;
  }
`;

export const PostersGrid = styled.div`
  display: grid;
  position: relative;
  width: 100%;
  margin-bottom: auto;
  grid-template-columns: ${({ $colCount }) => `repeat(${$colCount}, minmax(130px, 205px))`};
  justify-content: center;
  gap: 1.25rem;
  max-height: 35vh;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, black 0%, transparent);
  pointer-events: none;
  user-select: none;
  transform: scale(1.01);

  &::after {
    content: "";
    inset: 0;
    background: ${({ theme }) => `linear-gradient(200deg,${theme.colors.accent1}, ${theme.colors.accent2}, ${theme.colors.accent3})`};
    opacity: 0.5;
    position: absolute;
    z-index: 1;
  }

  &:not(.alt-grid) {
    .poster-wrapper:not(:nth-child(odd)) {
      transform: translateY(-100px);
    }
  }

  @media only ${({ theme }) => theme.breakpoints.sm} {
    gap: 0.75rem;
    grid-template-columns: repeat(4, minmax(80px, 1fr));
  }
`;

export const NetwrokDetailsWrapper = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;

  & > * {
    grid-area: 1 / 1;
  }

  .network-info {
    position: relative;
    z-index: 20;
  }

  .details-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 32px;
    margin-top: 1.5rem;

    @media only ${({ theme }) => theme.breakpoints.sm} {
      flex-direction: column;
      margin-top: 1rem;
      gap: 8px;
    }
  }

  .link {
    text-decoration: underline dotted;
    text-underline-offset: 4px;
    transition: opacity 0.2s ease-in-out;

    &:hover {
      opacity: 0.7;
    }
  }

  .logo-wrapper {
    position: relative;
    width: 200px;
    aspect-ratio: var(--aspectRatio);

    @media only ${({ theme }) => theme.breakpoints.sm} {
      width: 140px;
    }

    img {
      object-fit: contain !important;
    }
  }
`;

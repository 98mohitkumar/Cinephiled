import styled from "styled-components";

export const ExploreContainer = styled.div`
  width: 100%;
  padding: 32px 4.2vw;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 1.25rem;
  }
`;

export const PseudoTrack = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  height: 2px;
  width: calc(100% - 32vw);
  margin: auto;
  position: relative;
  top: -4px;
  z-index: -10;

  @media only ${({ theme }) => theme.breakpoints.xl} {
    display: none;
  }
`;

export const OuterWrapper = styled.div`
  max-width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar-track {
    margin-inline: 16vw;
  }

  @media only ${({ theme }) => theme.breakpoints.xl} {
    &::-webkit-scrollbar {
      display: none;
    }

    /* for firefox */
    scrollbar-width: none;
  }
`;

export const OverFlowWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  padding-bottom: 1rem;

  @media only ${({ theme }) => theme.breakpoints.xl} {
    padding-bottom: 0px;
  }
`;

export const GenreBG = styled.a`
  min-width: 180px;
  width: calc(100% / 6);
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 8px;
  padding: 24px;
  position: relative;
  aspect-ratio: 1/0.5;
  display: grid;
  place-items: center;
  transition: background-size 0.325s cubic-bezier(0.77, 0, 0.175, 1);
  background: ${({ genrename }) =>
    `Url(https://api.dicebear.com/7.x/shapes/svg?seed=${genrename}&scale=75) no-repeat center center / 105%`};

  .title {
    text-align: center;
    z-index: 2;
    font-weight: 600;
    font-size: clamp(1.25rem, 2vw, 1.75rem);
  }

  &::after {
    content: "";
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    inset: 0;
    transition: background-color 0.2s ease-in-out;
    z-index: 1;
  }

  &:hover {
    background-size: 140%;

    &::after {
      background-color: rgba(0, 0, 0, 0.4);
    }
  }
`;

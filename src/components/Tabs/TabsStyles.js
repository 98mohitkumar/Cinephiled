import styled from 'styled-components';

export const Tab = styled.div`
  width: clamp(360px, 90vw, 630px);
  min-height: 4.5rem;
  display: grid;
  grid-template-columns: ${({ count }) => `repeat(${count}, 1fr)`};
  margin: 4rem auto;
  border: 4px solid rgb(221, 221, 221);
  background: rgb(221, 221, 221);
  border-radius: 14px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  position: relative;

  @media only ${(props) => props.theme.breakpoints.ip} {
    min-height: 4rem;
    margin: 2rem auto;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    min-height: 3.25rem;
  }

  /* custom styling */
  ${({ styling }) => styling}
`;

export const Slider = styled.div`
  position: absolute;
  width: ${({ count }) => `${100 / count}%`};
  height: 100%;
  background: black;
  transform: ${({ state }) => `translateX(${state * 100}%)`};
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);
`;

export const Selection = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: ${({ active }) => (active ? 'white' : 'black')};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
  }

  /* custom styling */
  ${({ styling }) => styling}
`;

export const TabContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  overflow-x: auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(100, 100, 100, 0.9);

  &::-webkit-scrollbar {
    display: none;
  }

  /* for firefox */
  scrollbar-width: none;

  @media only ${(props) => props.theme.breakpoints.sm} {
    font-size: 1rem;
  }
`;

export const ActiveTabIndicator = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  bottom: 0;
  background: ${({ theme }) => theme.colors.accent2};
  z-index: 4;
  animation: pop 0.45s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
  border-radius: 4px 4px 0px 0px;

  @keyframes pop {
    0% {
      transform: scalex(0%);
    }
    100% {
      transform: scalex(100%);
    }
  }
`;

export const TabSelector = styled.div`
  padding: 1rem;
  width: ${({ count }) => `${100 / count}%`};
  display: grid;
  place-items: center;
  color: ${({ active }) => (active ? 'white' : '#ababab')};
  font-weight: 600;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  min-width: 120px;

  &:last-of-type {
    min-width: 220px;

    @media only ${(props) => props.theme.breakpoints.sm} {
      min-width: 170px;
    }
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1rem 0.5rem;
  }
`;

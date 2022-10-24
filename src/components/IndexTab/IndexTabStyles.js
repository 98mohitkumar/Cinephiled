import styled from 'styled-components';

export const Tab = styled.div`
  width: clamp(360px, 75vw, 630px);
  height: 4.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 4rem auto;
  border: 4px solid rgb(221, 221, 221);
  background: rgb(221, 221, 221);
  border-radius: 14px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  position: relative;

  @media only ${(props) => props.theme.breakpoints.ip} {
    height: 4rem;
    margin: 2rem auto;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    height: 3.25rem;
    border-radius: 10px;
  }
`;

export const Slider = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  background: black;
  ${({ state }) =>
    state === 'movies'
      ? `transform: translateX(0%);`
      : `transform: translateX(100%);`}
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.xs} {
    border-radius: 8px;
  }
`;

export const Selection = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.4s cubic-bezier(0.77, 0, 0.18, 1);

  @media only ${(props) => props.theme.breakpoints.ip} {
    margin-top: -3px;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.2rem;
    font-size: 1rem;
    margin-top: 0px;
  }
`;

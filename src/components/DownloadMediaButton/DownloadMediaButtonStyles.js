import styled from 'styled-components';

export const MediaDownloadButton = styled.div`
  width: 40px;
  height: 40px;
  background: ${(props) => props.theme.colors.primary1};
  position: absolute;
  bottom: 15px;
  right: 15px;
  border-radius: 10px;
  z-index: 10;
  display: grid;
  place-items: center;
  box-shadow: 0 0 2rem rgb(12 12 12 /0.4);
  opacity: 0.75;
  transition: all 0.25s ease-in-out;

  svg {
    pointer-events: none;
  }

  @media only ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }
`;

import styled from "styled-components";

export const Colorful = styled.div`
  position: absolute;
  inset: 0;
  background: ${(props) =>
    `linear-gradient(90deg, ${props.color[[1]]} 200px, ${
      props.color[[0]] + "d6"
    })`};
  z-index: 6;
  border-radius: 16px;
`;

import styled from "styled-components";

export const Colorful = styled.div`
  inset: 0;
  background-image: linear-gradient(90deg, #ccbdb4, #392a28d6);
  background-image: ${(props) =>
    `linear-gradient(90deg, ${props.color[[1]]} , ${props.color[[0]] + "8e"})`};
`;

export const Gradient = styled.div`
  position: absolute;
  background: linear-gradient(0deg, #121212 14%, rgba(21, 21, 21, 0.5) 100%);
  inset: 0;
  z-index: -1;
`;

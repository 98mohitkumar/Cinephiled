import styled from "styled-components";

export const Colorful = styled.div`
  inset: 0;
  background-image: linear-gradient(90deg, #ccbdb4, #392a28d6);
  background-image: ${(props) =>
    `linear-gradient(90deg, ${props.color[1]} , ${props.color[0] + "8e"})`};

  &.backdrop {
    opacity: 0.4;
    background-image: linear-gradient(0deg, #ccbdb463, #392a28d6, #121212);
    background-image: ${(props) =>
      `linear-gradient(${props.flip ? "180deg" : "0deg"}, ${props.color[1] + "94"}, ${
        props.color[0] + "8e"
      }, #121212)`};
  }
`;

import styled from "styled-components";

export const Colorful = styled.div`
  inset: 0;
  background-image: linear-gradient(90deg, #ccbdb4, #392a28d6);
  background-image: ${({ palette }) =>
    `linear-gradient(90deg, ${palette?.vibrant + "d6"} 40%, ${palette?.darkVibrant + "8e"})`};

  &.tint {
    opacity: 0.4;
    background-image: linear-gradient(0deg, #ccbdb463, #392a28d6, #121212);
    background-image: ${({ palette, flip }) =>
      `linear-gradient(${flip ? "180deg" : "0deg"}, ${palette.vibrant + "94"}, ${
        palette.darkVibrant + "8e"
      }, #121212)`};
  }
`;

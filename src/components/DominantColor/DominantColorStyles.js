import styled from "styled-components";

export const Colorful = styled.div`
  inset: 0;
  background-image: linear-gradient(90deg, #ccbdb4, #392a28d6);
  background-image: ${({ palette }) =>
    `linear-gradient(90deg, ${palette?.[0]}, ${palette?.[1] + "8e"})`};

  &.tint {
    background-image: ${({ flip }) =>
      `linear-gradient(${flip ? "180deg" : "0deg"}, #ccbdb463, #392a28d6, #121212)`};
    background-image: ${({ palette, flip }) =>
      `linear-gradient(${flip ? "180deg" : "0deg"}, ${palette?.[0] + "94"}, ${
        palette?.[1] + "8e"
      }, #121212)`};
  }
`;

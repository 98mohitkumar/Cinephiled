import styled from "styled-components";

export const Colorful = styled.div`
  inset: 0;
  background-image: ${(props) =>
    !props.color
      ? "linear-gradient(90deg, #ccbdb4, #392a28d6)"
      : `linear-gradient(90deg, ${props.color[[1]]} , ${
          props.color[[0]] + "8e"
        })`};
`;

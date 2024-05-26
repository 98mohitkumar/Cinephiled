import styled from "styled-components";

export const RatingTagWrapper = styled.div`
  position: absolute;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: #121212;
  /* background-color: red; */
  display: grid;
  place-items: center;
  right: 16px;
  bottom: -22px;

  & > * {
    grid-area: 1 / 1;
  }

  .label {
    font-family: ${(props) => props.theme.fonts.montserrat};
    font-weight: 600;
    font-size: 0.9rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    height: 42px;
    width: 42px;
    right: 12px;
    bottom: -22px;

    .label {
      font-size: 0.75rem;
    }
  }
`;

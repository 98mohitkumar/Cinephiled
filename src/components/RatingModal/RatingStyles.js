import styled from "styled-components";

export const RatingStarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .star {
    width: 26px;
    height: 26px;
    cursor: pointer;

    @media only ${(props) => props.theme.breakpoints.sm} {
      width: 22px;
      height: 22px;
    }
  }
`;

import styled from "styled-components";

export const ReviewsWrap = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 1rem 0rem;
  margin: 0rem auto 2rem auto;
  overflow: hidden;

  &:not(:last-of-type) {
    border-bottom: 1px solid grey;
  }
`;

export const Review = styled.p`
  padding: 1rem 0rem 0rem 0rem;
`;

export const ReviewAuthorWrap = styled.div`
  max-width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  & span {
    font-weight: bold;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    & span {
      font-size: 16px;
    }
  }
`;

export const ReviewAuthorImg = styled.div`
  min-width: 50px;
  height: 50px;
  background: ${(props) =>
    `Url(https://api.dicebear.com/6.x/bottts/svg?seed=${props.id}) no-repeat center center / cover`};
`;

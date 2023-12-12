import styled from "styled-components";

export const ReviewsWrap = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 1rem 0rem;
  margin: 0rem auto 2rem auto;
  overflow: hidden;

  &:not(:last-of-type) {
    border-bottom: 1px solid rgb(251 251 251 / 0.2);
  }
`;

export const Review = styled.div`
  padding: 1rem 0rem;
  white-space: pre-wrap;

  blockquote {
    font-style: italic;
    margin: 0;
    opacity: 0.8;
    padding: 0 1em;
    border-left: 0.25em solid #dfe2e5;
  }
`;

export const ReviewAuthorWrap = styled.div`
  max-width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ReviewAuthorImg = styled.div`
  min-width: 50px;
  height: 50px;
  background: ${(props) =>
    `Url(https://api.dicebear.com/6.x/bottts/svg?seed=${props.id}) no-repeat center center / cover`};
`;

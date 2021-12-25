import styled from "styled-components";

export const LightorDark = styled.div`
  color: white;
`;

export const MovieTitle = styled.h1`
  font-weight: bold;
  font-size: 2.25rem;
`;

export const Span = styled.span`
  font-weight: bold;
`;

export const GenreWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
  gap: 0rem 0.75rem;
`;

export const Rounded = styled.div`
  border: 2px solid white;
  border-radius: 20px;
  padding: 0.05rem 0.75rem;
`;

export const Divider = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  display: inline-block;
  background-color: white;
`;

export const RtoR = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: max-content;
`;

export const MovieRatingWrapper = styled.div`
  margin: 1rem 0rem;
`;

export const MovieCreditWrapper = styled.div`
  display: grid;
  place-items: center start;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
`;

export const MovieCredit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
`;

export const MovieFactsWrapper = styled.div`
  width: max-content;
  padding: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 5rem;
`;

export const FactsFieldSet = styled.fieldset`
  padding: 1rem;
  margin: 1rem auto 2rem;
  border: 2px solid #fff;
  border-radius: 20px;
`;

export const FactsLegend = styled.legend`
  width: max-content;
  padding: 0rem 1rem;
  margin: 0;
  margin-left: 2rem;
  float: none;
`;

export const CastContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 2rem 0rem;
  padding: 1rem 4rem;
`;

export const CastImg = styled.div`
  background: ${(props) =>
    props.data === null
      ? `Url(/Images/DefaultAvatar.png) no-repeat center center /cover`
      : `Url(https://image.tmdb.org/t/p/original${props.data}) no-repeat center 5% /cover`};
  width: 185px;
  height: 230px;
  border-radius: 16px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
`;

export const CastWrapper = styled.div`
  width: 185px;
  align-self: flex-start;
`;

export const ReviewsContainer = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const ReviewsWrap = styled.div`
  width: 100%;
  padding: 1rem 8rem;
`;

export const Review = styled.p`
  padding: 1.25rem 6rem;
`;

export const ReviewAuthorWrap = styled.div`
  max-width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export const ReviewAuthorImg = styled.div`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    `Url(https://avatars.dicebear.com/api/bottts/${props.id}.svg) no-repeat center center / cover`};
`;

export const BackdropsContainer = styled.div`
  width: 100%;
  padding: 3rem 5rem;
`;

export const BackdropsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 2.5rem;
`;

export const BackdropsImgContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
`;

export const BackdropsImg = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/original${props.backdrop}) no-repeat center center /cover;`};
`;

export const PostersContainer = styled.div`
  width: 100%;
  padding: 3rem 5rem;
`;

export const PostersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 2rem;
`;

export const PostersImg = styled.div`
  width: 100%;
  height: 370px;
  border-radius: 16px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.5);
  background: ${(props) =>
    `Url(https://image.tmdb.org/t/p/original${props.poster}) no-repeat center center /cover;`};
`;

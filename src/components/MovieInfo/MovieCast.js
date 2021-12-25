import { FlexWrapper } from "../../styles/GlobalComponents";
import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper,
  Span,
} from "./MovieDetailsStyles";

const MovieCast = ({ cast }) => {
  return (
    <CastContainer>
      <CastGrid>
        {cast.map((item) => (
          <CastWrapper key={item.credit_id}>
            <CastImg data={item.profile_path} gender={item.gender} />
            <FlexWrapper className="my-3">
              <Span className="fw-bold">{item.character}</Span>
              <Span className="fw-normal">{item.name}</Span>
            </FlexWrapper>
          </CastWrapper>
        ))}
      </CastGrid>
    </CastContainer>
  );
};

export default MovieCast;

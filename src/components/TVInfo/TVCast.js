import { FlexWrapper } from "../../styles/GlobalComponents";
import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper,
  Span,
} from "../MovieInfo/MovieDetailsStyles";
import { NoDataText } from "../../styles/GlobalComponents";

const TVCast = ({ cast }) => {
  return (
    <CastContainer>
      {cast.length === 0 ? (
        <NoDataText className="display-3 fw-bold text-center my-5">
          TBA
        </NoDataText>
      ) : (
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
      )}
    </CastContainer>
  );
};

export default TVCast;
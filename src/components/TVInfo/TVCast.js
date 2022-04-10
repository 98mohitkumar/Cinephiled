import { FlexWrapper } from "../../styles/GlobalComponents";
import {
  CastContainer,
  CastGrid,
  CastImg,
  CastWrapper,
  Span,
} from "../MovieInfo/MovieDetailsStyles";
import { NoDataText } from "../../styles/GlobalComponents";
import Link from "next/link";
import { motion } from "framer-motion";

const TVCast = ({ cast }) => {
  return (
    <CastContainer>
      {cast.length === 0 ? (
        <NoDataText className="fw-bold text-center my-5">TBA</NoDataText>
      ) : (
        <CastGrid>
          {cast.map((item) => (
            <Link key={item.credit_id} href={`/person/${item.id}`} passHref>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <CastWrapper role="button">
                  <CastImg data={item.profile_path} gender={item.gender} />
                  <FlexWrapper className="my-3">
                    <Span className="fw-bold movieCastHead">
                      {item.character}
                    </Span>
                    <Span className="movieCastName">{item.name}</Span>
                  </FlexWrapper>
                </CastWrapper>
              </motion.div>
            </Link>
          ))}
        </CastGrid>
      )}
    </CastContainer>
  );
};

export default TVCast;

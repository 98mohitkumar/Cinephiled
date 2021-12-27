import { FlexWrapper } from "../../styles/GlobalComponents";
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span,
} from "./MovieDetailsStyles";

const MovieFacts = ({ facts, languages }) => {
  const ogLanguage = facts.language;

  let FactsLanguage = "";

  languages.forEach((item) => {
    if (item.iso_639_1 === ogLanguage) {
      FactsLanguage = item.english_name;
    }
  });

  return (
    <FactsFieldSet>
      <FactsLegend className="fw-bold">Facts</FactsLegend>
      <FactsWrapper>
        <FlexWrapper>
          <Span>Status</Span>
          <Span className="fw-normal">{facts.status}</Span>
        </FlexWrapper>

        <FlexWrapper>
          <Span>Language</Span>
          <Span className="fw-normal">{FactsLanguage}</Span>
        </FlexWrapper>

        <FlexWrapper>
          <Span>Budget</Span>
          {facts.budget === 0 ? (
            <Span className="fw-normal">-</Span>
          ) : (
            <Span className="fw-normal">
              {"$" + facts.budget.toLocaleString()}
            </Span>
          )}
        </FlexWrapper>

        <FlexWrapper>
          <Span>Revenue</Span>
          {facts.revenue === 0 ? (
            <Span className="fw-normal">-</Span>
          ) : (
            <Span className="fw-normal">
              {"$" + facts.revenue.toLocaleString()}
            </Span>
          )}
        </FlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default MovieFacts;

import { FlexWrapper } from "../../styles/GlobalComponents";
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span,
} from "../MovieInfo/MovieDetailsStyles";

const TVFacts = ({ facts, languages }) => {
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
          <Span>Network</Span>
          <Span className="fw-normal">{facts.network}</Span>
        </FlexWrapper>

        <FlexWrapper>
          <Span>Type</Span>
          <Span className="fw-normal">{facts.type}</Span>
        </FlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default TVFacts;

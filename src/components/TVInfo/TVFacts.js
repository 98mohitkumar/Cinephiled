import { FactsFlexWrapper } from "../../styles/GlobalComponents";
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
        <FactsFlexWrapper>
          <Span>Status</Span>
          <Span className="fw-normal">{facts.status}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Language</Span>
          <Span className="fw-normal">{FactsLanguage}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Network</Span>
          <Span className="fw-normal">{facts.network}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Type</Span>
          <Span className="fw-normal">{facts.type}</Span>
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default TVFacts;

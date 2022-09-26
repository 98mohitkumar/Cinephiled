import { FactsFlexWrapper } from '../../styles/GlobalComponents';
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span,
} from '../MovieInfo/MovieDetailsStyles';

const TVFacts = ({ facts, languages }) => {
  const ogLanguage = facts.language;

  let FactsLanguage = '';

  languages.forEach((item) => {
    if (item.iso_639_1 === ogLanguage) {
      FactsLanguage = item.english_name;
    }
  });

  return (
    <FactsFieldSet>
      <FactsLegend className='fw-bold'>Facts</FactsLegend>
      <FactsWrapper>
        <FactsFlexWrapper>
          <Span>Status</Span>
          <Span>{facts.status}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Language</Span>
          <Span>{FactsLanguage}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Network</Span>
          <Span>{facts.network}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Type</Span>
          <Span>{facts.type}</Span>
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default TVFacts;

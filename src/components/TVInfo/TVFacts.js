import { FactsFlexWrapper } from '../../styles/GlobalComponents';
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span
} from '../MovieInfo/MovieDetailsStyles';

const TVFacts = ({ facts }) => {
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
          <Span>{facts.language}</Span>
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

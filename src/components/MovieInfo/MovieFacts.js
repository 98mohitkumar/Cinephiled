import countryToCurrency from 'country-to-currency';
import getSymbolFromCurrency from 'currency-symbol-map';
import { FactsFlexWrapper } from '../../styles/GlobalComponents';
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span
} from './MovieDetailsStyles';

const MovieFacts = ({ facts, country }) => {
  const currencyCode = countryToCurrency[country];
  const currency = getSymbolFromCurrency(currencyCode);

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
          <Span>Budget</Span>
          {facts.budget === 0 ? (
            <Span>-</Span>
          ) : (
            <Span>{currency + ' ' + facts.budget.toLocaleString()}</Span>
          )}
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Revenue</Span>
          {facts.revenue === 0 ? (
            <Span>-</Span>
          ) : (
            <Span>{currency + ' ' + facts.revenue.toLocaleString()}</Span>
          )}
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default MovieFacts;

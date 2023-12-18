import countryToCurrency from "country-to-currency";
import getSymbolFromCurrency from "currency-symbol-map";
import { FactsFlexWrapper } from "styles/GlobalComponents";
import { FactsFieldSet, FactsLegend, FactsWrapper, Span } from "./MovieDetailsStyles";

const MovieFacts = ({ facts, country }) => {
  const currencyCode = countryToCurrency[country];
  const currency = getSymbolFromCurrency(currencyCode);

  return (
    <FactsFieldSet>
      <FactsLegend className='font-bold text-2xl'>Facts</FactsLegend>
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
          {facts.budget ? (
            <Span>{currency + " " + facts.budget.toLocaleString()}</Span>
          ) : (
            <Span>-</Span>
          )}
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Revenue</Span>
          {facts.revenue ? (
            <Span>{currency + " " + facts.revenue.toLocaleString()}</Span>
          ) : (
            <Span>-</Span>
          )}
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default MovieFacts;

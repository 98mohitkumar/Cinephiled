import { FactsFlexWrapper } from "../../styles/GlobalComponents";
import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span,
} from "./MovieDetailsStyles";

import countryToCurrency from "country-to-currency";

import getSymbolFromCurrency from "currency-symbol-map";

const MovieFacts = ({ facts, languages, country }) => {
  const currencyCode = countryToCurrency[country];
  const currency = getSymbolFromCurrency(currencyCode);
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
          <Span>Budget</Span>
          {facts.budget === 0 ? (
            <Span className="fw-normal">-</Span>
          ) : (
            <Span className="fw-normal">
              {currency + " " + facts.budget.toLocaleString()}
            </Span>
          )}
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Revenue</Span>
          {facts.revenue === 0 ? (
            <Span className="fw-normal">-</Span>
          ) : (
            <Span className="fw-normal">
              {currency + " " + facts.revenue.toLocaleString()}
            </Span>
          )}
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default MovieFacts;

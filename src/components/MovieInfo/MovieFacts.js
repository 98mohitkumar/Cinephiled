import { FactsFieldSet, FactsLegend, FactsWrapper, Span } from "./MovieDetailsStyles";
import { FactsFlexWrapper } from "styles/GlobalComponents";

const MovieFacts = ({ facts }) => {
  return (
    <FactsFieldSet>
      <FactsLegend className='text-2xl font-bold'>Facts</FactsLegend>
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
            <Span>
              {facts.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </Span>
          ) : (
            <Span>-</Span>
          )}
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Revenue</Span>
          {facts.revenue ? (
            <Span>
              {facts.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </Span>
          ) : (
            <Span>-</Span>
          )}
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default MovieFacts;

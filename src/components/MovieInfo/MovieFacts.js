import { FactsFlexWrapper } from "styles/GlobalComponents";
import { FactsFieldSet, FactsLegend, FactsWrapper, Span } from "./MovieDetailsStyles";

const MovieFacts = ({ facts }) => {
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

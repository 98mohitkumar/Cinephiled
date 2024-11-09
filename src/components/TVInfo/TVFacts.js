import Link from "next/link";
import { FactsFieldSet, FactsLegend, FactsWrapper, Span } from "components/MovieInfo/MovieDetailsStyles";
import { FactsFlexWrapper } from "styles/GlobalComponents";
import { getCleanTitle } from "utils/helper";

const TVFacts = ({ facts }) => {
  const { status, language, network, type } = facts;

  return (
    <FactsFieldSet>
      <FactsLegend className='text-2xl font-bold'>Facts</FactsLegend>
      <FactsWrapper>
        <FactsFlexWrapper>
          <Span>Status</Span>
          <Span>{status}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Language</Span>
          <Span>{language}</Span>
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Network</Span>
          {network?.id ? (
            <Link href={`/network/${network?.id}-${getCleanTitle(network?.name)}`}>
              <Span className='network font-semibold'>{network?.name}</Span>
            </Link>
          ) : (
            <Span>{network?.name}</Span>
          )}
        </FactsFlexWrapper>

        <FactsFlexWrapper>
          <Span>Type</Span>
          <Span>{type}</Span>
        </FactsFlexWrapper>
      </FactsWrapper>
    </FactsFieldSet>
  );
};

export default TVFacts;

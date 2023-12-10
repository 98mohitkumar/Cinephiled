import {
  FactsFieldSet,
  FactsLegend,
  FactsWrapper,
  Span
} from "components/MovieInfo/MovieDetailsStyles";
import Link from "next/link";
import { FactsFlexWrapper } from "styles/GlobalComponents";

const TVFacts = ({ facts }) => {
  const { status, language, network, type } = facts;

  return (
    <FactsFieldSet>
      <FactsLegend className='font-bold text-2xl'>Facts</FactsLegend>
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
          {network?.name ? (
            <Link href={`/network/${network?.id}-${network?.name?.replace(/[' ', '/']/g, "-")}`}>
              <a>
                <Span className='network font-semibold'>{network?.name}</Span>
              </a>
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

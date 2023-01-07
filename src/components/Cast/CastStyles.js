import styled from 'styled-components';

export const CastContainer = styled.div`
  width: 100%;
  padding: 1rem 4.2vw 2rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0rem 1.25rem 1.25rem;
  }
`;

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  justify-items: center;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;

  @media only ${(props) => props.theme.breakpoints.sm} {
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, 150px);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CastImg = styled.div`
  width: 100%;
  aspect-ratio: 138/175;
  border-radius: 12px;
  overflow: hidden;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
        0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }
`;

export const CastWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
`;

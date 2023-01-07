import styled from 'styled-components';

export const PostersContainer = styled.div`
  width: 100%;
  padding: 1rem 4.2vw 2rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem 1.25rem;
  }
`;

export const PostersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 2rem;

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

export const PostersImg = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.54;
  border-radius: 12px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  overflow: hidden;
`;

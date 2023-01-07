import styled from 'styled-components';

export const BackdropsContainer = styled.div`
  width: 100%;
  padding: 1rem 4.2vw 2rem;

  @media only ${(props) => props.theme.breakpoints.xs} {
    padding: 0.5rem 1.25rem;
  }
`;

export const BackdropsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  gap: 2.5rem;

  @media only ${(props) => props.theme.breakpoints.ip} {
    gap: 2rem;
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media only ${(props) => props.theme.breakpoints.xs} {
    gap: 1.5rem;
  }
`;

export const BackdropsImgContainer = styled.div`
  width: 100%;
  aspect-ratio: 1.68;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14),
    0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
`;

export const BackdropsImg = styled.div`
  width: 100%;
  height: 100%;

  .media {
    transition: transform 0.25s cubic-bezier(0.79, 0.14, 0.15, 0.86);

    @media ${(props) => props.theme.breakpoints.hover} {
      &:hover {
        transform: scale(1.05);
      }
    }
  }
`;

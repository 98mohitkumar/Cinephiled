import styled from "styled-components";

export const PostersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: clamp(20px, 3vw, 32px);

  @media only ${(props) => props.theme.breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.ip} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  &.profile-media-grid {
    overflow-x: scroll;
    grid-template-columns: repeat(var(--colCount), min(38vw, 200px));
    gap: clamp(16px, 2.5vw, 24px);

    &::-webkit-scrollbar-track {
      margin-inline: 16vw;
    }

    @media only ${({ theme }) => theme.breakpoints.xl} {
      &::-webkit-scrollbar {
        display: none;
      }

      /* for firefox */
      scrollbar-width: none;
    }
  }
`;

export const PostersImg = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1.54;
  border-radius: 12px;
  box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
    0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
  overflow: hidden;
`;

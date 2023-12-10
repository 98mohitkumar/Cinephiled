import styled from "styled-components";

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  justify-items: center;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(20px, 3vw, 32px);

  @media only ${(props) => props.theme.breakpoints.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const CastWrapper = styled.div`
  width: 100%;
  align-self: flex-start;
`;

export const CastImg = styled.div`
  width: 100%;
  aspect-ratio: 138/175;
  border-radius: 12px;
  overflow: hidden;

  @media ${(props) => props.theme.breakpoints.hover} {
    &:hover {
      box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14), 0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
        0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);
    }
  }
`;

export const SeeMore = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
  border: 2px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

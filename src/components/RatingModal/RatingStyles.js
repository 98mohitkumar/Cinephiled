import styled from 'styled-components';

export const RatingModalContainer = styled.div`
  background-color: rgb(18 18 18 / 0.75);
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 1000;
  display: grid;
  place-items: center;

  @media only ${(props) => props.theme.breakpoints.sm} {
    place-items: flex-end center;
    padding-bottom: 2rem;
  }
`;

export const RatingCard = styled.div`
  width: 100%;
  max-width: clamp(360px, 90vw, 500px);
  padding: 1.75rem 2rem;
  border-radius: 12px;
  border: 1px solid rgba(80, 80, 80, 0.75);
  background: rgba(18, 18, 18);
  box-shadow: 0px 12px 17px 2px hsla(0, 0%, 0%, 0.14),
    0px 5px 22px 4px hsla(0, 0%, 0%, 0.12),
    0px 7px 8px -4px hsla(0, 0%, 0%, 0.2);

  @media only ${(props) => props.theme.breakpoints.sm} {
    padding: 1.25rem;
  }

  & > * {
    line-height: 1.4;
  }
`;

export const RatingButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  max-width: 260px;
  font-size: 1.1rem;
  border: none;
  font-weight: 500;

  &.secondary {
    background-color: transparent;
    color: white;
    border: 1px solid rgb(81 81 81 / 0.8);
  }

  &.full-width {
    max-width: unset;
  }

  @media only ${(props) => props.theme.breakpoints.xs} {
    font-size: 1rem;
  }
`;

export const RatingStarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  .star {
    width: 26px;
    height: 26px;
    cursor: pointer;

    @media only ${(props) => props.theme.breakpoints.sm} {
      width: 22px;
      height: 22px;
    }
  }
`;

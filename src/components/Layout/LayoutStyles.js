import styled from "styled-components";

import { MAX_WIDTH } from "data/global";

export const Wrapper = styled.main`
  max-width: ${MAX_WIDTH}px;
  margin: auto;
  position: relative;
  animation: reveal 1s ease-in-out;

  @keyframes reveal {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    flex-grow: 1;
  }

  .content-wrapper > * {
    flex-grow: 1;
  }
`;

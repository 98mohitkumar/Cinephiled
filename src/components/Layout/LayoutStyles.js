import styled from "styled-components";

import { MAX_WIDTH } from "data/global";
import { theme } from "theme/theme";

export const Wrapper = styled.main`
  max-width: ${MAX_WIDTH}px;
  margin: auto;
  position: relative;
  animation: reveal 1s ${theme.transitionTimings["in-out"]};

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
`;

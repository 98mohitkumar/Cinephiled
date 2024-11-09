import styled from "styled-components";
import { MAX_WIDTH } from "globals/constants";

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

  .content-wrapper:has(.login-container, .about-container, .list-wrapper) {
    display: flex;
    flex-direction: column;
  }
`;

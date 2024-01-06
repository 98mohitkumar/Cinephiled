import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 2000px;
  margin: auto;
  position: relative;

  .content-wrapper:has(.login-container, .about-container, .list-wrapper) {
    display: flex;
    flex-direction: column;
  }
`;

export const DetailsWrapper = styled.div`
  min-height: 100vh;
`;

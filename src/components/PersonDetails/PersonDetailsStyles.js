import styled from "styled-components";

export const Bio = styled.p`
  margin-top: 1rem;
  white-space: pre-line;
`;

export const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  align-items: start;
  gap: 1.5rem 4vw;
`;

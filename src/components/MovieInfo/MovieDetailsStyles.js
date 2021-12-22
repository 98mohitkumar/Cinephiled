import styled from "styled-components";

export const MovieTitle = styled.h1`
  font-weight: bold;
  color: white;
  color: ${(props) => (props.isDark ? "#fff" : "#111111")};
  transition: color 0.25s ease-in-out;
`;

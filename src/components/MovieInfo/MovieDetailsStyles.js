import styled from "styled-components";

export const MovieTitle = styled.h1`
  font-weight: bold;
  color: ${(props) => (props.isDark ? "#fff" : "#111111")};
`;

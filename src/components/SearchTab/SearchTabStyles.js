import styled from "styled-components";

export const SearchTabWrapper = styled.div`
  width: 40%;
  height: 4.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: auto;
  border: 4px solid white;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
  position: relative;

  ${(props) =>
    `& div:nth-child(2) {
    ${props.tabState === "movies" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(3) {
    ${props.tabState === "tv" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(4) {
    ${props.tabState === "keyword" ? `color: white;` : `color: black;`}
  }

`}
`;

export const SearchTabSlider = styled.div`
  position: absolute;
  width: 33.33%;
  height: 4rem;
  background: black;
  ${(props) =>
    props.tabState === "movies"
      ? `transform: translateX(0%);`
      : props.tabState === "tv"
      ? `transform: translateX(100%);`
      : props.tabState === "keyword"
      ? `transform: translateX(200%);`
      : null}
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);
`;

export const SearchTabSelectionTitle = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: black;
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.325s cubic-bezier(0.77, 0, 0.18, 1);
`;

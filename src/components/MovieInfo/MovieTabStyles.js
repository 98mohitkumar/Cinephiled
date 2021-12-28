import styled from "styled-components";

export const TabWrapper = styled.div`
  width: ${(props) => (props.tv ? `50%;` : `40%;`)};
  height: 4.5rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.tv ? `repeat(5, 1fr);` : `repeat(4, 1fr);`};
  margin: auto;
  border: 4px solid white;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
  position: relative;

  ${(props) =>
    props.tv
      ? `& div:nth-child(2) {
    ${props.tabCheck === "cast" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(3) {
    ${props.tabCheck === "seasons" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(4) {
    ${props.tabCheck === "reviews" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(5) {
    ${props.tabCheck === "backdrops" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(6) {
    ${props.tabCheck === "posters" ? `color: white;` : `color: black;`}
  }`
      : `& div:nth-child(2) {
    ${props.tabCheck === "cast" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(3) {
    ${props.tabCheck === "reviews" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(4) {
    ${props.tabCheck === "backdrops" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(5) {
    ${props.tabCheck === "posters" ? `color: white;` : `color: black;`}
  }`}
`;

export const TabSlider = styled.div`
  position: absolute;
  width: ${(props) => (props.tv ? "20%;" : "25%;")};
  height: 4rem;
  background: black;
  ${(props) =>
    props.tv
      ? props.tabCheck === "cast"
        ? `transform: translateX(0%);`
        : props.tabCheck === "seasons"
        ? `transform: translateX(100%);`
        : props.tabCheck === "reviews"
        ? `transform: translateX(200%);`
        : props.tabCheck === "backdrops"
        ? `transform: translateX(300%);`
        : props.tabCheck === "posters"
        ? `transform: translateX(400%);`
        : null
      : props.tabCheck === "cast"
      ? `transform: translateX(0%);`
      : props.tabCheck === "reviews"
      ? `transform: translateX(100%);`
      : props.tabCheck === "backdrops"
      ? `transform: translateX(200%);`
      : props.tabCheck === "posters"
      ? `transform: translateX(300%);`
      : null}
  border-radius: 12px;
  z-index: 4;
  transition: transform 0.325s cubic-bezier(0.77, 0, 0.18, 1);
`;

export const TabSelectionTitle = styled.div`
  padding: 1rem;
  display: grid;
  place-items: center;
  color: black;
  font-weight: bold;
  cursor: pointer;
  z-index: 5;
  transition: color 0.325s cubic-bezier(0.77, 0, 0.18, 1);
`;

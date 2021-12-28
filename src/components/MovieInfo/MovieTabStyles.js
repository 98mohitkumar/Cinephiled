import styled from "styled-components";

export const TabWrapper = styled.div`
  width: 50%;
  height: 4.5rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: auto;
  border: 4px solid white;
  background: white;
  border-radius: 14px;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.8);
  position: relative;

  & div:nth-child(2) {
    ${(props) =>
      props.tabCheck === "cast" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(3) {
    ${(props) =>
      props.tabCheck === "seasons" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(4) {
    ${(props) =>
      props.tabCheck === "reviews" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(5) {
    ${(props) =>
      props.tabCheck === "backdrops" ? `color: white;` : `color: black;`}
  }

  & div:nth-child(6) {
    ${(props) =>
      props.tabCheck === "posters" ? `color: white;` : `color: black;`}
  }
`;

export const TabSlider = styled.div`
  position: absolute;
  width: 20%;
  height: 4rem;
  background: black;
  ${(props) =>
    props.tabCheck === "cast"
      ? `transform: translateX(0%);`
      : props.tabCheck === "seasons"
      ? `transform: translateX(100%);`
      : props.tabCheck === "reviews"
      ? `transform: translateX(200%);`
      : props.tabCheck === "backdrops"
      ? `transform: translateX(300%);`
      : props.tabCheck === "posters"
      ? `transform: translateX(400%);`
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

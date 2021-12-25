import { useRef } from "react";
import { Container } from "../../styles/GlobalComponents";
import { Banner, Button, Form, HeroDiv, HeroTitle } from "./HeroStyles";

const Hero = () => {
  const api_key = "146aefbfac856df49543995a6badbf0f";

  const name = useRef("");

  const dbSearchHandler = async (event) => {
    event.preventDefault();

    const searchQuery = name.current.value;

    if (name.current.value === "") {
      return;
    } else {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
      );

      const res = await response.json();
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center position-relative">
      <Banner />
      <HeroDiv>
        <HeroTitle className="display-3 fw-bold m-0">
          Project Name Here
        </HeroTitle>
        <Form>
          <div className="m-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter movie name"
              id="inputData"
              ref={name}
              autoComplete="off"
            />
          </div>
          <Button className="btn d-block mt-3" onClick={dbSearchHandler}>
            Search
          </Button>
        </Form>
      </HeroDiv>
    </Container>
  );
};

export default Hero;

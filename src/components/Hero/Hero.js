import { useRouter } from "next/router";
import { useRef } from "react";
import { Container } from "../../styles/GlobalComponents";
import { Banner, Button, Form, HeroDiv, HeroTitle } from "./HeroStyles";

const Hero = () => {
  const name = useRef("");
  const Router = useRouter();

  const dbSearchHandler = async (event) => {
    event.preventDefault();

    const searchQuery = name.current.value;

    if (searchQuery.length === 0 || searchQuery.trim().length === 0) {
      name.current.value = "";
      return;
    } else {
      name.current.value = "";
      event.target.blur();
      Router.push(`/search/${searchQuery}`);
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
              placeholder="Search for a movie or tv show"
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

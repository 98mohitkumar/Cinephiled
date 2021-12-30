import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Container } from "../../styles/GlobalComponents";
import { Banner, Button, Form, HeroDiv, UserInput } from "./HeroStyles";

const Hero = () => {
  const name = useRef("");
  const Router = useRouter();
  const [userInput, setUserInput] = useState();
  const [showButton, setShowButton] = useState(false);

  const inputChangeHandler = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    let input = name.current.value;
    if (input.length === 0 || input.trim().length === 0) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, [userInput]);

  const dbSearchHandler = async (event) => {
    event.preventDefault();
    const searchQuery = userInput;

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
        <Form>
          <div className="m-2">
            <UserInput
              type="text"
              className="form-control"
              placeholder="Search for a movie or tv show"
              id="inputData"
              ref={name}
              autoComplete="off"
              onChange={inputChangeHandler}
            />
          </div>
          <Button
            show={showButton}
            className="btn d-block mt-3"
            onClick={dbSearchHandler}
          >
            Search
          </Button>
        </Form>
      </HeroDiv>
    </Container>
  );
};

export default Hero;

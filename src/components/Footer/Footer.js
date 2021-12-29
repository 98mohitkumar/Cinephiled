import {
  FooterAttribute,
  FooterWrapper,
  SocialIcons,
  SocialIconsContainer,
} from "./FooterStyles";
import { BsInstagram } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterWrapper className="d-flex justify-content-between align-items-center">
      <span className="fs-3 mx-3 fw-bold">Project name here</span>
      <SocialIconsContainer>
        <SocialIcons
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noreferrer"
        >
          <FooterAttribute />
        </SocialIcons>
        <SocialIcons
          href="https://instagram.com/mohitkek"
          target="_blank"
          className="ms-3"
          rel="noreferrer"
        >
          <BsInstagram size="2.25rem" />
        </SocialIcons>
        <SocialIcons
          href="https://t.me/mohitkek"
          target="_blank"
          rel="noreferrer"
        >
          <FaTelegramPlane size="2.25rem" />
        </SocialIcons>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default Footer;

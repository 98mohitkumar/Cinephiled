import { memo } from "react";
import { FiLinkedin, FiInstagram } from "react-icons/fi";
import {
  FooterAttribute,
  FooterBranding,
  FooterWrapper,
  SocialIcons,
  SocialIconsContainer
} from "./FooterStyles";

const Footer = () => {
  return (
    <FooterWrapper className='flex justify-between items-center'>
      <FooterBranding>Cinephiled</FooterBranding>
      <SocialIconsContainer>
        <SocialIcons
          href='https://www.themoviedb.org'
          target='_blank'
          rel='noreferrer'
          aria-label='TMDB link'>
          <FooterAttribute />
        </SocialIcons>

        <SocialIcons
          href='https://instagram.com/mohitkek'
          target='_blank'
          rel='noreferrer'
          aria-label='instagram link'>
          <FiInstagram size='2rem' />
        </SocialIcons>

        <SocialIcons
          href='https://www.linkedin.com/in/98mohitkumar'
          target='_blank'
          rel='noreferrer'
          aria-label='linkedin link'>
          <FiLinkedin size='2rem' />
        </SocialIcons>
      </SocialIconsContainer>
    </FooterWrapper>
  );
};

export default memo(Footer);

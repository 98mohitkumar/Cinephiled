import { Github, Linkedin } from "lucide-react";

import { TMDBCredit } from "components/Shared/GlobalComponents";
import FlexBox from "components/UI/FlexBox";
import LayoutContainer from "components/UI/LayoutContainer";
import H4 from "components/UI/Typography/H4";

import { footerWrapper, footerLink } from "./FooterStyles";

const footerLinks = [
  { label: "TMDB link", href: "https://www.themoviedb.org", icon: <TMDBCredit /> },
  {
    label: "github link",
    href: "https://github.com/98mohitkumar",
    icon: <Github size={32} className='footer-icon' />
  },
  {
    label: "linkedin link",
    href: "https://www.linkedin.com/in/98mohitkumar",
    icon: <Linkedin size={32} className='footer-icon' />
  }
];

const Footer = () => {
  return (
    <LayoutContainer className='py-20' css={footerWrapper} id='footer'>
      <FlexBox tag='footer' className='items-center justify-between'>
        <H4 weight='medium'>Cinephiled</H4>
        <FlexBox className='items-center justify-between gap-3264'>
          {footerLinks.map(({ label, href, icon }) => (
            <a css={footerLink} key={label} href={href} target='_blank' rel='noreferrer' aria-label={label}>
              {icon}
            </a>
          ))}
        </FlexBox>
      </FlexBox>
    </LayoutContainer>
  );
};

export default Footer;

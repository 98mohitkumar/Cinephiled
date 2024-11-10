import { Github, Linkedin } from "lucide-react";
import { footerWrapper, footerLink } from "./FooterStyles";
import { FlexBox, LayoutContainer } from "components/Layout/helpers";
import H4 from "components/Typography/H4";
import { TMDBCredit } from "styles/GlobalComponents";

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
    <LayoutContainer className='py-20' css={footerWrapper}>
      <FlexBox tag='footer' className='items-center justify-between'>
        <H4 weight='medium'>Cinephiled</H4>
        <FlexBox className='items-center justify-between gap-2064'>
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

import { BiLink } from "react-icons/bi";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { SocialMediaLinksWrapper } from "styles/GlobalComponents";

const SocialMediaLinks = ({ links, homepage }) => {
  const display = !links?.facebook_id && !links?.instagram_id && !links?.twitter_id && !homepage;

  return (
    <SocialMediaLinksWrapper $hide={display}>
      {links?.facebook_id && (
        <a
          href={`https://facebook.com/${links?.facebook_id}`}
          target='_blank'
          className='link'
          rel='noreferrer'
          aria-label='facebook'>
          <FiFacebook size='1.6rem' />
        </a>
      )}

      {links?.instagram_id && (
        <a
          href={`https://instagram.com/${links?.instagram_id}`}
          target='_blank'
          className='link'
          rel='noreferrer'
          aria-label='instagram'>
          <FiInstagram size='1.65rem' />
        </a>
      )}

      {links?.twitter_id && (
        <a
          href={`https://twitter.com/${links?.twitter_id}`}
          target='_blank'
          className='link'
          rel='noreferrer'
          aria-label='twitter'>
          <FiTwitter size='1.65rem' />
        </a>
      )}

      {homepage && (
        <a href={homepage} target='_blank' className='link' rel='noreferrer' aria-label='homepage'>
          <BiLink size='1.8rem' />
        </a>
      )}
    </SocialMediaLinksWrapper>
  );
};

export default SocialMediaLinks;

import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa";
import { SocialMediaLinksWrapper } from "../../styles/GlobalComponents";

const SocialMediaLinks = ({ links, homepage }) => {
  const display =
    (links.facebook_id === null || links.facebook_id === "") &&
    (links.instagram_id === null || links.instagram_id === "") &&
    (links.twitter_id === null || links.twitter_id === "") &&
    (homepage === "" || homepage === null);

  return (
    <SocialMediaLinksWrapper notShow={display}>
      {links.facebook_id !== null && links.facebook_id !== "" && (
        <a
          href={`https://facebook.com/${links.facebook_id}`}
          target="_blank"
          rel="noreferrer"
          aria-label="facebook"
        >
          <FaFacebook size="1.75rem" />
        </a>
      )}

      {links.instagram_id !== null && links.instagram_id !== "" && (
        <a
          href={`https://instagram.com/${links.instagram_id}`}
          target="_blank"
          rel="noreferrer"
          aria-label="instagram"
        >
          <FaInstagram size="1.75rem" />
        </a>
      )}

      {links.twitter_id !== null && links.twitter_id !== "" && (
        <a
          href={`https://twitter.com/${links.twitter_id}`}
          target="_blank"
          rel="noreferrer"
          aria-label="twitter"
        >
          <FaTwitter size="1.75rem" />
        </a>
      )}

      {homepage !== "" && homepage !== null && (
        <a
          href={homepage}
          target="_blank"
          rel="noreferrer"
          aria-label="homepage"
        >
          <FaLink size="1.75rem" />
        </a>
      )}
    </SocialMediaLinksWrapper>
  );
};

export default SocialMediaLinks;

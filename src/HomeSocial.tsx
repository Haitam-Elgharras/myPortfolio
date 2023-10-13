import SocialLink from "./SocialLink";
import socialLinks from "./data/socialLinks";

const HomeSocial = () => {
  return (
    <div className="home__social">
      {socialLinks.map((socialLink, i) => (
        <SocialLink key={i} {...socialLink} />
      ))}
    </div>
  );
};

export default HomeSocial;

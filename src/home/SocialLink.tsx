interface Props {
  link: string;
  icon: string;
}

const SocialLink = ({ link, icon }: Props) => {
  return (
    <a href={link} className="home__social-icon" target="_blank">
      <i className={icon}></i>
    </a>
  );
};

export default SocialLink;

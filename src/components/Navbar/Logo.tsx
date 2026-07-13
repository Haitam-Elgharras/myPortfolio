import HeLogo from "../../assets/img/HEfovicon.png";

interface Props {
  name: string;
}

const Logo = ({ name }: Props) => {
  return (
    <a href="#home" aria-label="Go to homepage" className="nav__logo-link">
      <img src={HeLogo} alt={name} className="nav__logo" />
    </a>
  );
};

export default Logo;

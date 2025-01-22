import HeLogo from "../../assets/img/HEfovicon.png";

interface Props {
  name: string;
}

const Logo = ({ name }: Props) => {
  return <img src={HeLogo} alt={name} className="nav__logo" />;
};

export default Logo;

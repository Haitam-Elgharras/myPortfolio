import heMark from "../../assets/img/logo-mark.png";

interface Props {
  name: string;
}

const Logo = ({ name }: Props) => {
  return (
    <a href="#home" aria-label={`${name} — home`} className="nav__logo-link">
      <img src={heMark} alt={name} className="nav__logo" />
    </a>
  );
};

export default Logo;

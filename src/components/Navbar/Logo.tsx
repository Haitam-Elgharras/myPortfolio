import { Link } from "react-router-dom";

interface Props {
  name: string;
}

const Logo = ({ name }: Props) => {
  return (
    <Link to="/" className="nav__logo">
      {name}
    </Link>
  );
};

export default Logo;

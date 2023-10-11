interface Props {
  name: string;
}

const Logo = ({ name }: Props) => {
  return (
    <a href="/" className="nav__logo">
      {name}
    </a>
  );
};

export default Logo;

interface Props {
  text: string;
  iconClass: string;
  isActive: boolean;
  onClick: () => void;
  target: string;
}

const QualificationButtonItem = ({
  text,
  iconClass,
  isActive,
  onClick,
  target,
}: Props) => {
  const buttonClasses = `qualification__button button--flex ${
    isActive ? "qualification__active" : ""
  }`;

  return (
    <div className={buttonClasses} data-target={target} onClick={onClick}>
      <i className={iconClass}></i>
      {text}
    </div>
  );
};

export default QualificationButtonItem;

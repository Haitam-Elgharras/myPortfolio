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
  const buttonClasses = `qualification__button ${
    isActive ? "qualification__active" : ""
  }`;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={buttonClasses}
      data-target={target}
      onClick={onClick}
    >
      <i className={iconClass} aria-hidden="true"></i>
      {text}
    </button>
  );
};

export default QualificationButtonItem;

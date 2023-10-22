interface Props {
  title: string;
  subtitle: string;
}

function SectionTitle({ title, subtitle }: Props) {
  return (
    <div>
      <h2 className="section__title">{title}</h2>
      <span className="section__subtitle">{subtitle}</span>
    </div>
  );
}

export default SectionTitle;

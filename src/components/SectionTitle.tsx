interface Props {
  title: string;
  subtitle: string;
}

function SectionTitle({ title, subtitle }: Props) {
  return (
    <div className="section__header reveal">
      <span className="section__subtitle">{subtitle}</span>
      <h2 className="section__title">{title}</h2>
    </div>
  );
}

export default SectionTitle;

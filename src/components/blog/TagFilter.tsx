type Props = {
  tags: Array<{ tag: string; count: number }>;
  active: string | null;
  onSelect: (tag: string | null) => void;
};

const TagFilter = ({ tags, active, onSelect }: Props) => {
  if (tags.length === 0) return null;

  return (
    <div className="tag-filter" role="group" aria-label="Filter posts by tag">
      <button
        type="button"
        className={`post-tag post-tag--button${active === null ? " is-active" : ""}`}
        aria-pressed={active === null}
        onClick={() => onSelect(null)}
      >
        All
      </button>
      {tags.map(({ tag, count }) => (
        <button
          key={tag}
          type="button"
          className={`post-tag post-tag--button${active === tag ? " is-active" : ""}`}
          aria-pressed={active === tag}
          onClick={() => onSelect(active === tag ? null : tag)}
        >
          {tag}
          <span className="post-tag__count">{count}</span>
        </button>
      ))}
    </div>
  );
};

export default TagFilter;

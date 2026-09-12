type Props = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
};

const SearchInput = ({ value, onChange, resultCount }: Props) => {
  return (
    <div className="blog-search">
      <label className="blog-search__label" htmlFor="blog-search-input">
        Search posts
      </label>
      <div className="blog-search__field">
        <i className="uil uil-search" aria-hidden="true"></i>
        <input
          id="blog-search-input"
          type="search"
          className="blog-search__input"
          placeholder="kafka, testing, spring boot…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
      </div>
      <p className="blog-search__status" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "post" : "posts"}
      </p>
    </div>
  );
};

export default SearchInput;

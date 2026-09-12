import type { TocEntry } from "../../lib/blogTypes";

/** Fewer than this is not a structure worth navigating. */
export const TOC_MIN_ENTRIES = 3;

const TableOfContents = ({ entries }: { entries: TocEntry[] }) => {
  if (entries.length < TOC_MIN_ENTRIES) return null;

  return (
    <nav className="post-toc" aria-labelledby="post-toc-heading">
      <p className="post-toc__heading" id="post-toc-heading">
        On this page
      </p>
      <ul className="post-toc__list">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className={`post-toc__item post-toc__item--h${entry.depth}`}
          >
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

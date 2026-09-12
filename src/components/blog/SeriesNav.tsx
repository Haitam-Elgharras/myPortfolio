import { Link } from "react-router";
import type { PostMeta } from "../../lib/blogTypes";

type Props = {
  series: string;
  entries: PostMeta[];
  currentSlug: string;
};

const SeriesNav = ({ series, entries, currentSlug }: Props) => {
  if (entries.length < 2) return null;

  const position = entries.findIndex((post) => post.slug === currentSlug) + 1;

  return (
    <aside className="post-series">
      <p className="post-series__eyebrow">
        Part {position} of {entries.length} — {series}
      </p>
      <ol className="post-series__list">
        {entries.map((post) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li
              key={post.slug}
              className={`post-series__item${isCurrent ? " is-current" : ""}`}
            >
              {isCurrent ? (
                <span aria-current="true">{post.title}</span>
              ) : (
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
};

export default SeriesNav;

import { Link } from "react-router";
import type { PostMeta } from "../../lib/blogTypes";

type Props = {
  older: PostMeta | null;
  newer: PostMeta | null;
};

const PostNav = ({ older, newer }: Props) => {
  if (!older && !newer) return null;

  return (
    <nav className="post-nav" aria-label="More posts">
      {older ? (
        <Link to={`/blog/${older.slug}`} className="post-nav__link">
          <span className="post-nav__label">
            <i className="uil uil-arrow-left" aria-hidden="true"></i>
            Previously
          </span>
          <span className="post-nav__title">{older.title}</span>
        </Link>
      ) : (
        <span />
      )}

      {newer ? (
        <Link
          to={`/blog/${newer.slug}`}
          className="post-nav__link post-nav__link--next"
        >
          <span className="post-nav__label">
            Next up
            <i className="uil uil-arrow-right" aria-hidden="true"></i>
          </span>
          <span className="post-nav__title">{newer.title}</span>
        </Link>
      ) : null}
    </nav>
  );
};

export default PostNav;

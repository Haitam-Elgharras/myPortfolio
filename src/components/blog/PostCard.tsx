import { Link } from "react-router";
import type { PostMeta } from "../../lib/blogTypes";
import { formatDate } from "../../lib/blog";

type Props = {
  post: PostMeta;
  featured?: boolean;
};

const PostCard = ({ post, featured = false }: Props) => {
  return (
    <article className={`post-card${featured ? " post-card--featured" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="post-card__link">
        {post.cover ? (
          <img
            className="post-card__cover"
            src={post.cover}
            alt={post.coverAlt ?? ""}
            loading="lazy"
            decoding="async"
          />
        ) : null}

        <div className="post-card__body">
          <p className="post-card__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </p>

          <h3 className="post-card__title">{post.title}</h3>
          <p className="post-card__excerpt">{post.excerpt}</p>

          {post.tags.length > 0 ? (
            <ul className="post-card__tags">
              {post.tags.map((tag) => (
                <li key={tag} className="post-tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Link>
    </article>
  );
};

export default PostCard;

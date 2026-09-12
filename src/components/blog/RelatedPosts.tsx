import { Link } from "react-router";
import type { PostMeta } from "../../lib/blogTypes";
import { formatDate } from "../../lib/blog";

const RelatedPosts = ({ posts }: { posts: PostMeta[] }) => {
  if (posts.length === 0) return null;

  return (
    <aside className="post-related">
      <h2 className="post-related__heading">Related reading</h2>
      <ul className="post-related__list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`} className="post-related__link">
              <span className="post-related__title">{post.title}</span>
              <span className="post-related__meta">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                {post.readingMinutes} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default RelatedPosts;

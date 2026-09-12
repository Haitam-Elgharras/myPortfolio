import { useMemo } from "react";
import { useSearchParams } from "react-router";
import PostCard from "../components/blog/PostCard";
import SearchInput from "../components/blog/SearchInput";
import TagFilter from "../components/blog/TagFilter";
import { allTags, filterPosts, posts } from "../lib/blog";
import { useMounted } from "../hooks/useMounted";
import { buildMeta, siteUrl } from "../lib/seo";
import "../components/blog/style.css";

export function meta() {
  return buildMeta({
    title: "Engineering notes | Haitam Elgharras",
    description:
      "Notes on Java, Spring Boot, Kafka, React and TypeScript from production work — written by Haitam Elgharras.",
    path: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Haitam Elgharras — Engineering notes",
      url: `${siteUrl}/blog`,
      author: { "@type": "Person", name: "Haitam Elgharras" },
    },
  });
}

const BlogIndexPage = () => {
  const [params, setParams] = useSearchParams();

  const mounted = useMounted();
  const query = mounted ? params.get("q") ?? "" : "";
  const tag = mounted ? params.get("tag") : null;

  const tags = useMemo(() => allTags(), []);
  const visible = useMemo(
    () => filterPosts(posts, query, tag),
    [query, tag]
  );

  const update = (key: string, value: string | null, replace: boolean) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace }
    );
  };

  const featured = !query && !tag ? visible.filter((p) => p.featured) : [];
  const rest = featured.length
    ? visible.filter((post) => !post.featured)
    : visible;

  return (
    <main className="main blog-index">
      <div className="container">
        <header className="blog-index__header">
          <p className="eyebrow">Blog</p>
          <h1 className="blog-index__title">Engineering notes</h1>
          <p className="blog-index__lead">
            Things I learned building and running backend services and web
            applications — mostly Java, Spring Boot, Kafka, React and
            TypeScript.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="blog-index__empty">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <>
            <div className="blog-index__controls">
              <SearchInput
                value={query}
                onChange={(value) => update("q", value, true)}
                resultCount={visible.length}
              />
              <TagFilter
                tags={tags}
                active={tag}
                onSelect={(value) => update("tag", value, false)}
              />
            </div>

            {visible.length === 0 ? (
              <p className="blog-index__empty">
                Nothing matches that. Try a different term or clear the filters.
              </p>
            ) : (
              <>
                {featured.map((post) => (
                  <PostCard key={post.slug} post={post} featured />
                ))}
                <div className="blog-index__grid">
                  {rest.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default BlogIndexPage;

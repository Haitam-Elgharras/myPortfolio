import { Link, useLoaderData } from "react-router";
import PostNav from "../components/blog/PostNav";
import RelatedPosts from "../components/blog/RelatedPosts";
import SeriesNav from "../components/blog/SeriesNav";
import TableOfContents, {
  TOC_MIN_ENTRIES,
} from "../components/blog/TableOfContents";
import {
  formatDate,
  getAdjacent,
  getPostBySlug,
  getRelated,
  getSeries,
  loadPostBody,
} from "../lib/blog";
import { buildMeta, siteUrl } from "../lib/seo";
import "../components/blog/style.css";

type LoaderArgs = { params: { slug?: string } };

export async function loader({ params }: LoaderArgs) {
  const post = params.slug ? getPostBySlug(params.slug) : undefined;
  if (!post) throw new Response("Not Found", { status: 404 });

  const body = await loadPostBody(post.slug);
  if (!body) throw new Response("Not Found", { status: 404 });

  return {
    post,
    body,
    adjacent: getAdjacent(post.slug),
    related: getRelated(post),
    series: getSeries(post),
  };
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export function meta({ data }: { data: LoaderData | undefined }) {
  if (!data) {
    return buildMeta({
      title: "Post Not Found | Haitam Elgharras",
      description: "The requested post could not be found on elhaitam.com.",
      path: "/blog/not-found",
      noindex: true,
    });
  }

  const { post } = data;
  const path = `/blog/${post.slug}`;
  const image = post.ogImage ? `${siteUrl}${post.ogImage}` : undefined;

  return buildMeta({
    title: `${post.title} | Haitam Elgharras`,
    description: post.excerpt,
    path,
    image,
    type: "article",
    extraMeta: [
      { property: "article:published_time", content: post.date },
      {
        property: "article:modified_time",
        content: post.updated ?? post.date,
      },
      { property: "article:author", content: "Haitam Elgharras" },
      ...post.tags.map((tag: string) => ({
        property: "article:tag",
        content: tag,
      })),
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: image ?? `${siteUrl}/og-haitam-elgharras.png`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: {
        "@type": "Person",
        name: "Haitam Elgharras",
        url: siteUrl,
      },
      publisher: { "@type": "Person", name: "Haitam Elgharras" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}${path}` },
      keywords: post.tags.join(", "),
      wordCount: post.wordCount,
      timeRequired: `PT${post.readingMinutes}M`,
    },
  });
}

const BlogPostPage = () => {
  const { post, body, adjacent, related, series } = useLoaderData() as LoaderData;

  const hasToc = body.toc.length >= TOC_MIN_ENTRIES;

  return (
    <main className="main post-page">
      <div className="container post-page__container">
        <Link to="/blog" className="post-page__back">
          <i className="uil uil-arrow-left" aria-hidden="true"></i>
          All posts
        </Link>

        <header className="post-page__header">
          <p className="eyebrow">{post.series ?? "Engineering notes"}</p>
          <h1 className="post-page__title">{post.title}</h1>
          <p className="post-page__meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
            {post.updated ? (
              <>
                <span aria-hidden="true">·</span>
                <span>Updated {formatDate(post.updated)}</span>
              </>
            ) : null}
          </p>

          {post.tags.length > 0 ? (
            <ul className="post-page__tags">
              {post.tags.map((tag: string) => (
                <li key={tag}>
                  <Link to={`/blog?tag=${encodeURIComponent(tag)}`} className="post-tag">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {post.cover ? (
          <img
            className="post-page__cover"
            src={post.cover}
            alt={post.coverAlt ?? ""}
            width={1600}
            decoding="async"
          />
        ) : null}

        <div
          className={`post-page__layout${hasToc ? " post-page__layout--with-toc" : ""}`}
        >
          {hasToc ? <TableOfContents entries={body.toc} /> : null}

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: body.html }}
          />
        </div>

        {post.canonicalUrl ? (
          <p className="post-page__canonical">
            This post first appeared at{" "}
            <a href={post.canonicalUrl} rel="nofollow noopener noreferrer">
              {new URL(post.canonicalUrl).hostname}
            </a>
            .
          </p>
        ) : null}

        {post.series ? (
          <SeriesNav
            series={post.series}
            entries={series}
            currentSlug={post.slug}
          />
        ) : null}

        <PostNav older={adjacent.older} newer={adjacent.newer} />
        <RelatedPosts posts={related} />
      </div>
    </main>
  );
};

export default BlogPostPage;

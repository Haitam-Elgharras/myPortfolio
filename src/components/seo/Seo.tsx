import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const siteUrl = "https://www.elhaitam.com";
const defaultImage = `${siteUrl}/og-haitam-elgharras.png`;

function setMeta(selector: string, attr: "name" | "property", value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, selector.match(/"(.*)"/)?.[1] ?? "");
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

const Seo = ({
  title,
  description,
  path = "/",
  image = defaultImage,
  type = "website",
  schema
}: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteUrl).toString();

    document.title = title;
    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[name="robots"]', "name", "index,follow,max-image-preview:large");
    setMeta('meta[property="og:type"]', "property", type);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", image);
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", image);
    setLink("canonical", canonicalUrl);

    const previousSchema = document.head.querySelector('script[data-seo-schema="true"]');
    previousSchema?.remove();

    if (schema) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-seo-schema", "true");
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [description, image, path, schema, title, type]);

  return null;
};

export default Seo;

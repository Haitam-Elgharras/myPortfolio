import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeShiki from "@shikijs/rehype";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";
import type { TocEntry } from "../src/lib/blogTypes.ts";
import { stripToProse } from "./readingTime.ts";

/** Collects h2/h3 headings into file.data.toc for the in-page table of contents. */
function collectHeadings() {
  return (tree: Root, file: { data: Record<string, unknown> }) => {
    const toc: TocEntry[] = [];
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = String(node.properties?.id ?? "");
      if (!id) return;
      toc.push({
        id,
        // trailing "#" comes from the autolink anchor appended above
        text: toString(node).replace(/#$/, "").trim(),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    });
    file.data.toc = toc;
  };
}

/** Wraps tables so a wide one scrolls instead of blowing out the prose measure. */
function wrapTables() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;
      if ((parent as Element).properties?.className) {
        const cls = (parent as Element).properties.className;
        if (Array.isArray(cls) && cls.includes("prose__table-scroll")) return;
      }
      const wrapper: Element = {
        type: "element",
        tagName: "div",
        properties: { className: ["prose__table-scroll"] },
        children: [node],
      };
      (parent as Element).children[index] = wrapper;
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // Notion emits raw <details>/<table> for toggles and tables, so the HTML in
  // the markdown has to survive the trip rather than be escaped.
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: {
      className: ["prose__anchor"],
      // hast wants the string form of the ARIA attribute, not a boolean.
      ariaHidden: "true",
      tabIndex: -1,
    },
    content: { type: "text", value: "#" },
  } satisfies AutolinkOptions)
  .use(rehypeExternalLinks, {
    target: "_blank",
    rel: ["nofollow", "noopener", "noreferrer"],
  })
  .use(rehypeShiki, {
    themes: { light: "vitesse-light", dark: "vesper" },
    // Emit --shiki-light / --shiki-dark custom properties per token so the
    // stylesheet can switch themes without re-highlighting in the browser.
    defaultColor: false,
    // An unfamiliar language must not take the whole build down.
    fallbackLanguage: "text",
    transformers: [
      {
        pre(node: Element) {
          // Shiki writes the theme background inline, which would beat
          // `.prose pre { background: var(--surface-2) }`.
          delete node.properties.style;
          node.properties.tabindex = "0";
        },
      },
    ],
  })
  .use(wrapTables)
  .use(collectHeadings)
  .use(rehypeStringify, { allowDangerousHtml: true });

export async function mdToHtml(markdown: string) {
  const file = await processor.process(markdown);
  return {
    html: String(file),
    toc: (file.data.toc ?? []) as TocEntry[],
    plainText: stripToProse(markdown).replace(/\s+/g, " ").trim(),
  };
}

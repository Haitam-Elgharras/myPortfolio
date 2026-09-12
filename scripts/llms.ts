import { writeFile } from "node:fs/promises";
import type { PostMeta } from "../src/lib/blogTypes.ts";
import { projectSlugs } from "../src/data/siteRoutes.ts";
import { SITE } from "./site.ts";

/** Regenerates public/llms.txt so the post list cannot go stale. */
export async function writeLlmsTxt(posts: PostMeta[]) {
  const lines = [
    `# ${SITE.author.name}`,
    "",
    "Software engineer and full stack developer in Morocco.",
    "",
    `Main page: ${SITE.url}/`,
    "Projects:",
    ...projectSlugs.map((slug) => `- ${SITE.url}/projects/${slug}`),
    "",
    "Focus areas:",
    "- Backend services",
    "- Distributed systems",
    "- Full-stack web applications",
    "- Java and Spring Boot",
    "- React and TypeScript",
    "- Docker and Kafka",
  ];

  if (posts.length > 0) {
    lines.push("", "## Blog", `Index: ${SITE.url}/blog`, "");
    for (const post of posts) {
      lines.push(`- ${post.title} (${post.date}): ${SITE.url}/blog/${post.slug}`);
      if (post.excerpt) lines.push(`  ${post.excerpt}`);
    }
  }

  await writeFile("public/llms.txt", `${lines.join("\n")}\n`);
}

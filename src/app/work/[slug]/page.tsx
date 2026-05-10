import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

const SLUGS = ["tallytappy", "plan-it"] as const;
type Slug = (typeof SLUGS)[number];

const TITLES: Record<Slug, string> = {
  tallytappy: "TallyTappy — Case Study",
  "plan-it": "Plan.it — Case Study",
};

async function readMarkdown(slug: Slug): Promise<string> {
  const file = path.join(process.cwd(), "src", "content", "work", `${slug}.md`);
  return fs.readFile(file, "utf8");
}

// Statically generate both case studies at build time.
export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return {};
  return {
    title: TITLES[slug as Slug],
    description: `Long-form write-up of ${TITLES[slug as Slug].split(" — ")[0]}.`,
  };
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();
  const md = await readMarkdown(slug as Slug);

  return (
    <main className="case-study">
      <div className="container reading">
        <Link href="/" className="case-study__back">
          ← Back to portfolio
        </Link>
        <article className="case-study__body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}

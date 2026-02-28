import MarkdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import createDOMPurify from "dompurify";

const md = new MarkdownIt();
md.use(markdownItFootnote);

export function decodeMarkdown(content: string): string {
  const isClient = typeof window !== "undefined";

  const DOMPurify = isClient
    ? createDOMPurify(window)
    : { sanitize: (x: string) => x };

  const rawHtml = md.render(content);

  return DOMPurify.sanitize(rawHtml);
}

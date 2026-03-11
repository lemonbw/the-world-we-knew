"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { defaultSchema } from 'hast-util-sanitize';


const schema = {
  ...defaultSchema,
  clobberPrefix: '',
};

type ReadingContentProps = {
  content: string;
  className?: string;
};

export default function ReadingContent({ content, className }: ReadingContentProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}>
        {content}
      </ReactMarkdown>
    </div >
  );
}

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
};

export default function ReadingContent({ content }: ReadingContentProps) {
  return (
    <div className="p-2 h-full overflow-y-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}>
        {content}
      </ReactMarkdown>
    </div >
  );
}

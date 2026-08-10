'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { defaultSchema } from 'hast-util-sanitize';

const schema = {
  ...defaultSchema,
  clobberPrefix: '',
};

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

export const MarkdownRenderer = ({
  content,
  className,
}: MarkdownRendererProps) => {
  return (
    <div
      className={`${className}, mx-2 [&_h1]:mb-4 [&_h1]:font-bold [&_h2]:my-4 [&_h2]:font-semibold [&_h3]:my-2 [&_h3]:font-medium [&_hr]:w-[97.5%] [&_li]:ml-1 [&_p]:my-2 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeSanitize, schema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

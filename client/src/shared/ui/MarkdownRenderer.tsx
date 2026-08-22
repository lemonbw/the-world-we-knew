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
      className={`${className} mx-2 max-w-full break-words [&_h1]:mb-4 [&_h1]:font-bold [&_h1]:text-2xl lg:[&_h1]:text-3xl xl:[&_h1]:text-4xl 2xl:[&_h1]:text-5xl [&_h2]:my-4 [&_h2]:font-semibold [&_h2]:text-xl lg:[&_h2]:text-2xl xl:[&_h2]:text-3xl 2xl:[&_h2]:text-4xl [&_h3]:my-2 [&_h3]:font-medium [&_h3]:text-lg lg:[&_h3]:text-xl xl:[&_h3]:text-2xl 2xl:[&_h3]:text-3xl [&_hr]:w-[97.5%] [&_li]:ml-1 [&_p]:my-2 xl:[&_p]:my-3.5 2xl:[&_p]:my-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 xl:[&_ul]:pl-8`}
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

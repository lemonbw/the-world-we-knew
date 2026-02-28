declare module "markdown-it" {
  interface MarkdownItOptions {
    html?: boolean;
    xhtmlOut?: boolean;
    breaks?: boolean;
    langPrefix?: string;
    linkify?: boolean;
    typographer?: boolean;
    quotes?: string;
  }

  interface MarkdownIt {
    use(plugin: any, ...opts: any[]): MarkdownIt;
    render(markdown: string, env?: any): string;
  }

  const MarkdownIt: {
    new (options?: MarkdownItOptions): MarkdownIt;
  };

  export default MarkdownIt;
}

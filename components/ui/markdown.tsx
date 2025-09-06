"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

type MarkdownProps = {
  content: string;
};

type MarkdownCodeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  inline?: boolean;
  className?: string;
};

export function Markdown({ content }: MarkdownProps) {
  const components: Components = {
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-6",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight text-foreground mt-8 mb-4 first:mt-0",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "scroll-m-20 text-xl font-semibold tracking-tight text-muted-foreground mt-6 mb-3",
          className
        )}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn(
          "font-medium text-primary underline underline-offset-4 hover:opacity-90",
          className
        )}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong className={cn("font-semibold", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic text-muted-foreground",
          className
        )}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    hr: ({ className, ...props }) => (
      <hr className={cn("my-6 border-muted", className)} {...props} />
    ),
    // 'inline' is provided by react-markdown at runtime.
    code: ({ inline, className, children, ...props }: MarkdownCodeProps) => {
      if (inline) {
        return (
          <code
            className={cn(
              "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
              className
            )}
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <code
          className={cn(
            "block overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "overflow-x-auto rounded-lg bg-muted p-4 text-sm",
          className
        )}
        {...props}
      />
    ),
    table: ({ className, children, ...props }) => (
      <div className="my-6 w-full overflow-x-auto">
        <table
          className={cn("w-full border-collapse text-sm", className)}
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ className, ...props }) => (
      <thead
        className={cn("bg-muted text-muted-foreground", className)}
        {...props}
      />
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-border px-3 py-2 text-left font-medium",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn("border border-border px-3 py-2 align-top", className)}
        {...props}
      />
    ),
    tbody: ({ className, ...props }) => (
      <tbody className={cn("divide-y divide-border", className)} {...props} />
    ),
  };

  return (
    <div className="markdown max-w-none break-words text-foreground">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

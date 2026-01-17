import { ReactNode } from 'react'

export const MDXComponents = {
  h1: ({ children, ...props }: { children?: ReactNode }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children?: ReactNode }) => (
    <h2 className="text-3xl font-bold mt-12 mb-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children?: ReactNode }) => (
    <h3 className="text-2xl font-bold mt-8 mb-4" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children?: ReactNode }) => (
    <h4 className="text-xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: { children?: ReactNode }) => (
    <p className="mb-4 leading-relaxed text-[rgb(var(--foreground))]" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: { children?: ReactNode }) => (
    <ul className="my-6 list-disc pl-6 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: { children?: ReactNode }) => (
    <ol className="my-6 list-decimal pl-6 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: { children?: ReactNode }) => (
    <li className="my-2 text-[rgb(var(--foreground))]" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: { children?: ReactNode }) => (
    <blockquote 
      className="border-l-4 border-[rgb(var(--primary))] pl-4 italic my-6 text-[rgb(var(--muted))]" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }: { children?: ReactNode; href?: string }) => (
    <a 
      href={href} 
      className="text-[rgb(var(--primary))] hover:underline" 
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: { children?: ReactNode }) => (
    <strong className="font-bold text-[rgb(var(--foreground))]" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: { children?: ReactNode }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  code: ({ children, ...props }: { children?: ReactNode }) => (
    <code 
      className="bg-[rgb(var(--surface))] px-1.5 py-0.5 rounded text-sm font-mono" 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }: { children?: ReactNode }) => (
    <pre 
      className="bg-[rgb(var(--surface))] border border-[rgb(var(--border))] rounded-lg p-4 overflow-x-auto my-6" 
      {...props}
    >
      {children}
    </pre>
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-[rgb(var(--border))]" {...props} />
  ),
  table: ({ children, ...props }: { children?: ReactNode }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: { children?: ReactNode }) => (
    <thead className="bg-[rgb(var(--surface))]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: { children?: ReactNode }) => (
    <th className="border border-[rgb(var(--border))] p-2 text-left font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: { children?: ReactNode }) => (
    <td className="border border-[rgb(var(--border))] p-2" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }: { src?: string; alt?: string }) => (
    <img 
      src={src} 
      alt={alt || ''} 
      className="rounded-lg shadow-md my-6 w-full" 
      {...props} 
    />
  ),
}

import type { TipTapContent, TipTapNode } from '@/lib/types';

interface TipTapRendererProps {
  content: TipTapContent;
}

export function TipTapRenderer({ content }: TipTapRendererProps) {
  if (!content || !content.content) {
    return null;
  }

  return (
    <div className="prose prose-invert prose-cloud max-w-none">
      {content.content.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  );
}

interface RenderNodeProps {
  node: TipTapNode;
}

function RenderNode({ node }: RenderNodeProps) {
  switch (node.type) {
    case 'heading':
      return <HeadingNode node={node} />;
    case 'paragraph':
      return <ParagraphNode node={node} />;
    case 'bulletList':
      return <BulletListNode node={node} />;
    case 'orderedList':
      return <OrderedListNode node={node} />;
    case 'listItem':
      return <ListItemNode node={node} />;
    case 'blockquote':
      return <BlockquoteNode node={node} />;
    case 'codeBlock':
      return <CodeBlockNode node={node} />;
    case 'horizontalRule':
      return <hr className="border-cloud/20 my-8" />;
    case 'text':
      return <TextNode node={node} />;
    default:
      // Fallback for unknown node types
      if (node.content) {
        return (
          <>
            {node.content.map((child, index) => (
              <RenderNode key={index} node={child} />
            ))}
          </>
        );
      }
      return null;
  }
}

function HeadingNode({ node }: RenderNodeProps) {
  const level = (node.attrs?.level as number) || 2;
  const content = node.content?.map((child, index) => (
    <RenderNode key={index} node={child} />
  ));

  const baseClasses = 'font-serif text-cloud';
  const levelClasses: Record<number, string> = {
    1: 'text-4xl lg:text-5xl mt-12 mb-6',
    2: 'text-3xl lg:text-4xl mt-10 mb-5',
    3: 'text-2xl lg:text-3xl mt-8 mb-4',
    4: 'text-xl lg:text-2xl mt-6 mb-3',
    5: 'text-lg lg:text-xl mt-4 mb-2',
    6: 'text-base lg:text-lg mt-3 mb-2',
  };

  const className = `${baseClasses} ${levelClasses[level] || levelClasses[2]}`;

  switch (level) {
    case 1:
      return <h1 className={className}>{content}</h1>;
    case 2:
      return <h2 className={className}>{content}</h2>;
    case 3:
      return <h3 className={className}>{content}</h3>;
    case 4:
      return <h4 className={className}>{content}</h4>;
    case 5:
      return <h5 className={className}>{content}</h5>;
    case 6:
      return <h6 className={className}>{content}</h6>;
    default:
      return <h2 className={className}>{content}</h2>;
  }
}

function ParagraphNode({ node }: RenderNodeProps) {
  if (!node.content || node.content.length === 0) {
    return <p className="my-4" />;
  }

  return (
    <p className="text-cloud/80 font-sans text-lg leading-relaxed my-4">
      {node.content.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </p>
  );
}

function BulletListNode({ node }: RenderNodeProps) {
  return (
    <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-cloud/80 font-sans">
      {node.content?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </ul>
  );
}

function OrderedListNode({ node }: RenderNodeProps) {
  return (
    <ol className="list-decimal list-outside ml-6 my-4 space-y-2 text-cloud/80 font-sans">
      {node.content?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </ol>
  );
}

function ListItemNode({ node }: RenderNodeProps) {
  return (
    <li className="leading-relaxed">
      {node.content?.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </li>
  );
}

function BlockquoteNode({ node }: RenderNodeProps) {
  return (
    <blockquote className="border-l-4 border-boardroom pl-6 py-2 my-8 bg-midnight-400/30 rounded-r">
      <div className="text-cloud/90 font-sans text-lg italic leading-relaxed">
        {node.content?.map((child, index) => (
          <RenderNode key={index} node={child} />
        ))}
      </div>
    </blockquote>
  );
}

function CodeBlockNode({ node }: RenderNodeProps) {
  const language = (node.attrs?.language as string) || 'plaintext';
  const code = node.content?.[0]?.text || '';

  return (
    <div className="my-6 rounded-lg overflow-hidden">
      {language !== 'plaintext' && (
        <div className="bg-midnight-400 px-4 py-2 text-xs font-mono text-cloud/60 border-b border-cloud/10">
          {language}
        </div>
      )}
      <pre className="bg-midnight-600 p-4 overflow-x-auto">
        <code className="font-mono text-sm text-cloud/90">{code}</code>
      </pre>
    </div>
  );
}

function TextNode({ node }: RenderNodeProps) {
  let content: React.ReactNode = node.text || '';

  // Apply marks (bold, italic, link, code, etc.)
  if (node.marks) {
    for (const mark of node.marks) {
      switch (mark.type) {
        case 'bold':
          content = <strong className="font-semibold text-cloud">{content}</strong>;
          break;
        case 'italic':
          content = <em className="italic">{content}</em>;
          break;
        case 'code':
          content = (
            <code className="font-mono text-sm bg-midnight-400 px-1.5 py-0.5 rounded text-boardroom">
              {content}
            </code>
          );
          break;
        case 'link':
          content = (
            <a
              href={mark.attrs?.href as string}
              target={mark.attrs?.target as string || '_blank'}
              rel="noopener noreferrer"
              className="text-boardroom hover:text-boardroom-400 underline underline-offset-2 transition-colors duration-200"
            >
              {content}
            </a>
          );
          break;
        case 'strike':
          content = <s className="line-through">{content}</s>;
          break;
        case 'underline':
          content = <u className="underline">{content}</u>;
          break;
        default:
          break;
      }
    }
  }

  return <>{content}</>;
}

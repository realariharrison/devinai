// Convert Markdown to TipTap JSON format
import type { TipTapContent, TipTapNode } from './types';

export function markdownToTipTap(markdown: string): TipTapContent {
  const lines = markdown.split('\n');
  const content: TipTapNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      content.push({
        type: 'heading',
        attrs: { level: headingMatch[1].length },
        content: parseInline(headingMatch[2]),
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      content.push({ type: 'horizontalRule' });
      i++;
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      const language = line.slice(3).trim() || 'plaintext';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      content.push({
        type: 'codeBlock',
        attrs: { language },
        content: [{ type: 'text', text: codeLines.join('\n') }],
      });
      i++; // Skip closing ```
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      content.push({
        type: 'blockquote',
        content: [{
          type: 'paragraph',
          content: parseInline(quoteLines.join(' ')),
        }],
      });
      continue;
    }

    // Unordered list
    if (/^[-*+]\s+/.test(line)) {
      const listItems: TipTapNode[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^[-*+]\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInline(itemText),
          }],
        });
        i++;
      }
      content.push({
        type: 'bulletList',
        content: listItems,
      });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const listItems: TipTapNode[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        const itemText = lines[i].replace(/^\d+\.\s+/, '');
        listItems.push({
          type: 'listItem',
          content: [{
            type: 'paragraph',
            content: parseInline(itemText),
          }],
        });
        i++;
      }
      content.push({
        type: 'orderedList',
        content: listItems,
      });
      continue;
    }

    // Regular paragraph - collect consecutive lines
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('>') &&
      !lines[i].startsWith('```') &&
      !/^[-*+]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^(-{3,}|\*{3,}|_{3,})$/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i]);
      i++;
    }

    if (paragraphLines.length > 0) {
      content.push({
        type: 'paragraph',
        content: parseInline(paragraphLines.join(' ')),
      });
    }
  }

  return { type: 'doc', content };
}

// Parse inline formatting (bold, italic, code, links)
function parseInline(text: string): TipTapNode[] {
  const nodes: TipTapNode[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Bold **text** or __text__
    const boldMatch = remaining.match(/^(\*\*|__)(.+?)\1/);
    if (boldMatch) {
      nodes.push({
        type: 'text',
        text: boldMatch[2],
        marks: [{ type: 'bold' }],
      });
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Italic *text* or _text_ (but not inside words for _)
    const italicMatch = remaining.match(/^(\*|_)([^*_]+?)\1(?![a-zA-Z])/);
    if (italicMatch) {
      nodes.push({
        type: 'text',
        text: italicMatch[2],
        marks: [{ type: 'italic' }],
      });
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Inline code `text`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      nodes.push({
        type: 'text',
        text: codeMatch[1],
        marks: [{ type: 'code' }],
      });
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Links [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      nodes.push({
        type: 'text',
        text: linkMatch[1],
        marks: [{ type: 'link', attrs: { href: linkMatch[2], target: '_blank' } }],
      });
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Strikethrough ~~text~~
    const strikeMatch = remaining.match(/^~~(.+?)~~/);
    if (strikeMatch) {
      nodes.push({
        type: 'text',
        text: strikeMatch[1],
        marks: [{ type: 'strike' }],
      });
      remaining = remaining.slice(strikeMatch[0].length);
      continue;
    }

    // Plain text - find next special character or end
    const nextSpecial = remaining.search(/[\*_`\[~]/);
    if (nextSpecial === -1) {
      // No more special characters
      nodes.push({ type: 'text', text: remaining });
      break;
    } else if (nextSpecial === 0) {
      // Special char didn't match a pattern, treat as plain text
      nodes.push({ type: 'text', text: remaining[0] });
      remaining = remaining.slice(1);
    } else {
      // Plain text up to next special char
      nodes.push({ type: 'text', text: remaining.slice(0, nextSpecial) });
      remaining = remaining.slice(nextSpecial);
    }
  }

  // Merge adjacent text nodes with same marks
  return mergeTextNodes(nodes);
}

function mergeTextNodes(nodes: TipTapNode[]): TipTapNode[] {
  const merged: TipTapNode[] = [];

  for (const node of nodes) {
    const last = merged[merged.length - 1];
    if (
      last &&
      last.type === 'text' &&
      node.type === 'text' &&
      JSON.stringify(last.marks || []) === JSON.stringify(node.marks || [])
    ) {
      last.text = (last.text || '') + (node.text || '');
    } else {
      merged.push(node);
    }
  }

  return merged;
}

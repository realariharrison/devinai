'use client';

import { Quote } from 'lucide-react';

interface TestimonialBlockProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
}

export function TestimonialBlock({
  quote,
  author,
  role,
  className = '',
}: TestimonialBlockProps) {
  return (
    <blockquote
      className={`
        relative pl-6 border-l-4 border-boardroom
        bg-midnight-600 rounded-r-lg py-8 pr-8
        ${className}
      `}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-6 right-6 w-8 h-8 text-boardroom/20" />

      {/* Quote Text */}
      <p className="font-serif text-xl lg:text-2xl text-cloud/90 italic leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Attribution */}
      <footer className="flex items-center gap-4">
        {/* Author Avatar Placeholder */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-boardroom to-cloud/40 flex items-center justify-center">
          <span className="font-mono text-sm font-semibold text-midnight">
            {author
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </span>
        </div>

        <div>
          <cite className="not-italic font-sans font-semibold text-vault block">
            {author}
          </cite>
          <span className="font-sans text-sm text-cloud/60">
            {role}
          </span>
        </div>
      </footer>
    </blockquote>
  );
}

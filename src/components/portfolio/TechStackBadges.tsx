'use client';

interface TechStackBadgesProps {
  technologies: string[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TechStackBadges({
  technologies,
  className = '',
  size = 'md',
}: TechStackBadgesProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech) => (
        <span
          key={tech}
          className={`
            font-mono font-medium rounded
            bg-vault/10 text-boardroom border border-vault/20
            hover:bg-vault/15 hover:border-boardroom/40
            transition-all duration-200
            ${sizeClasses[size]}
          `}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

import type { ReactNode } from "react";

type WordTooltipProps = {
  translation?: string;
  className?: string;
  children: ReactNode;
};

export function WordTooltip({ translation, className, children }: WordTooltipProps) {
  if (!translation) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`listening-word${className ? ` ${className}` : ""}`}>
      {children}
      <span className="listening-word__tooltip" role="tooltip">
        {translation}
      </span>
    </span>
  );
}

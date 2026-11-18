import Link from "next/link";
import type { ReactNode } from "react";

export function AscentCardGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`ascent-card-grid ${className}`.trim()}>{children}</div>;
}

export function AscentCard({
  href,
  index,
  title,
  eyebrow,
  description,
  action,
  icon,
  revealed = true,
  revealDelay = 0,
  rich = false,
}: {
  href: string;
  index?: number;
  title: string;
  eyebrow?: string;
  description?: string;
  action?: string;
  icon?: ReactNode;
  revealed?: boolean;
  revealDelay?: number;
  rich?: boolean;
}) {
  const scene = index != null ? String(index).padStart(2, "0") : "";

  return (
    <div
      className={`ascent-card-slide ${rich ? "is-rich" : ""} ${revealed ? "is-in" : "is-hidden"}`.trim()}
      style={revealed && revealDelay ? { transitionDelay: `${revealDelay}s` } : undefined}
    >
      <Link href={href} prefetch={false} className="ascent-card">
        {scene ? <span className="ascent-card-index">{scene}</span> : null}
        {icon ? <span className="ascent-card-icon">{icon}</span> : null}
        <span className="ascent-card-copyblock">
          {eyebrow ? <span className="ascent-card-kicker">{eyebrow}</span> : null}
          <span className="ascent-card-title">{title}</span>
          {description ? <span className="ascent-card-copy">{description}</span> : null}
        </span>
        <span className="ascent-card-go">
          {action ?? "Open"}
          <span aria-hidden="true">↗</span>
        </span>
      </Link>
    </div>
  );
}

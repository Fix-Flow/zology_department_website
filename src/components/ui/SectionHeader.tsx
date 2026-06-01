
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  eyebrow,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div data-component="SectionHeader" className={`mb-10 ${centered ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-heading text-section-head text-govt-text">
        {title}
      </h2>
      <span className={centered ? "gold-divider-center" : "gold-divider"} />
      {subtitle && (
        <p className={`mt-3.5 text-govt-muted text-sm max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

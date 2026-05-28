
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <div data-component="SectionHeader" className={`mb-8 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="font-heading text-section-head text-govt-text">
        {title}
      </h2>
      <span className={centered ? "gold-divider-center" : "gold-divider"} />
      {subtitle && (
        <p className="mt-3 text-govt-muted text-sm max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

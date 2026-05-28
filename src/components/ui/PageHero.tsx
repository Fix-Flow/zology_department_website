
interface PageHeroProps {
  title: string;
  subtitle?: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div data-component="PageHero" className="page-hero">
      <div className="section-container">
        <h1 className="font-heading text-page-title text-white">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-white/70 text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

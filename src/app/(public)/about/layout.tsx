import PageHero from "@/components/ui/PageHero";
import AboutTabs from "./AboutTabs";

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHero
        title="About the Department"
        subtitle="Learn about our history, vision, and commitment to academic excellence in Zoology"
      />
      <div data-component="About_layout" className="section-container section-padding">
        <AboutTabs />
        <div className="animate-fade-in">
          {children}
        </div>
      </div>
    </>
  );
}

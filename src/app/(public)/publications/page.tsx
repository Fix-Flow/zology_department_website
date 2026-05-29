import PageHero from "@/components/ui/PageHero";
import PublicationCard from "@/components/publications/PublicationCard";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Research Publications",
  description:
    "Explore the latest research publications, journals, and books published by the faculty and students of the Department of Zoology.",
};

export default async function PublicationsPage() {
  const dbPublications = await prisma.publication.findMany({
    where: { isActive: true },
    orderBy: { year: "desc" },
  });

  // Group by year
  const publicationsByYear = dbPublications.reduce((acc, pub) => {
    if (!acc[pub.year]) {
      acc[pub.year] = [];
    }
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<number, typeof dbPublications>);

  // Sort years descending
  const sortedYears = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <PageHero
        title="Research Publications"
        subtitle="Discover our contributions to scientific knowledge through peer-reviewed journals, books, and conferences."
      />

      <div data-component="Publications_page" className="section-container section-padding space-y-16">
        {dbPublications.length > 0 ? (
          sortedYears.map((year) => (
            <section key={year} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-govt-border pb-2 mb-6">
                <h2 className="text-2xl font-bold text-govt-text font-heading">{year}</h2>
                <div className="h-px bg-govt-border flex-1"></div>
                <span className="text-sm font-medium bg-neutral-bg px-3 py-1 rounded-full text-govt-muted">
                  {publicationsByYear[year].length} Papers
                </span>
              </div>
              
              <div className="grid gap-4">
                {publicationsByYear[year].map((pub) => (
                  <PublicationCard key={pub.id} publication={pub} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-govt-muted py-12">
            No publications have been added yet. Check back soon!
          </p>
        )}
      </div>
    </>
  );
}

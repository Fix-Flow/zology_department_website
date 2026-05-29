import { BookOpen, FileText, Link as LinkIcon, Star } from "lucide-react";
import type { Publication } from "@prisma/client";

export default function PublicationCard({ publication }: { publication: Publication }) {
  // Format authors
  const authorString = publication.authors.join(", ");
  
  // Choose icon based on type
  const Icon = publication.type === "JOURNAL" ? FileText : BookOpen;
  
  return (
    <div className="bg-white border border-govt-border rounded-xl p-6 transition-all hover:shadow-lg hover:border-primary/30 group">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        
        {/* Main Content */}
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
              <Icon size={12} />
              {publication.type}
            </span>
            {publication.impactFactor && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                <Star size={12} />
                IF: {publication.impactFactor}
              </span>
            )}
            <span className="text-xs font-medium text-govt-muted">
              Published: {publication.year}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-govt-text group-hover:text-primary transition-colors leading-tight">
            {publication.title}
          </h3>
          
          <p className="text-sm text-govt-muted">
            <span className="font-medium text-govt-text">Authors:</span> {authorString}
          </p>
          
          <p className="text-sm italic text-govt-muted">
            {publication.journal}
          </p>
        </div>

        {/* DOI Link Button */}
        {publication.doi && (
          <a
            href={publication.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-neutral-bg border border-govt-border text-govt-text hover:bg-primary hover:text-white hover:border-primary rounded-lg text-sm font-medium transition-colors"
          >
            <LinkIcon size={16} />
            View Paper
          </a>
        )}
        
      </div>
    </div>
  );
}

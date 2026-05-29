import Link from "next/link";
import { Home, Search } from "lucide-react";


export default function NotFound() {
  return (
    <div data-component="not-found" className="section-container flex flex-col items-center justify-center py-20 text-center min-h-[80vh]">
      {/* 404 Number */}
      <div className="relative mb-6">
        <span className="text-[120px] sm:text-[160px] font-heading font-bold text-primary/5 leading-none select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search size={48} className="text-primary/30" />
        </div>
      </div>

      <h1 className="font-heading text-2xl sm:text-3xl font-bold text-govt-text">
        Page Not Found
      </h1>
      <p className="mt-3 text-govt-muted max-w-md leading-relaxed">
        The page you are looking for might have been removed, renamed, or is
        temporarily unavailable. Please check the URL or navigate to another page.
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home size={16} />
          Go to Homepage
        </Link>
        <Link href="/about" className="btn-outline">
          About the Department
        </Link>
      </div>
    </div>
  );
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution.
 * Combines clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind class conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a human-readable format.
 * @param dateString - ISO date string
 * @param options - Intl.DateTimeFormat options
 */
export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-IN", options).format(date);
}

/**
 * Format a date to show only month and year.
 */
export function formatMonthYear(dateString: string): string {
  return formatDate(dateString, { year: "numeric", month: "short" });
}

/**
 * Convert a string to a URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

/**
 * Truncate text to a given length with an ellipsis.
 */
export function truncate(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Get initials from a name (e.g., "Dr. S. Ramesh" → "SR").
 */
export function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s*/i, "")
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Generate a file size display string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Check if a date is in the past.
 */
export function isPastDate(dateString: string): boolean {
  return new Date(dateString) < new Date();
}

/**
 * Check if a date is within the last N days.
 */
export function isRecent(dateString: string, days: number = 7): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000;
}

/**
 * Determine if the "NEW" badge should be shown on a notice.
 * Returns true if the admin marked it as new AND it's less than 24 hours old.
 */
export function isNoticeNew(isNewFlag: boolean, dateVal: string | Date): boolean {
  if (!isNewFlag) return false;
  
  const date = new Date(dateVal);
  const now = new Date();
  
  // Difference in milliseconds
  const diffMs = now.getTime() - date.getTime();
  
  // If date is in the future, it's definitely new.
  if (diffMs < 0) return true;
  
  // If it's less than 24 hours old (1 day), it's new.
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  return diffMs <= ONE_DAY_MS;
}

/**
 * Convert comma-separated string to an array of trimmed strings.
 */
export function parseCsv(str?: string | null, delimiter: string | RegExp = ","): string[] {
  if (!str) return [];
  return str
    .split(delimiter)
    .map((s) => s.trim())
    .filter(Boolean);
}

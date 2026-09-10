import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateReadingTime(content?: string | null, excerpt?: string | null): number {
  if (!content && !excerpt) return 1;
  const combinedText = `${excerpt || ''} ${content || ''}`.replace(/<[^>]*>?/gm, '');
  const words = combinedText.trim().split(/\s+/).filter((w) => w.length > 0).length;
  if (words === 0) return 1;
  return Math.max(1, Math.ceil(words / 200));
}

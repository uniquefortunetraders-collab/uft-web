import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = "No content available",
  description = "No items have been created yet. Content managed through CMS will appear here.",
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-emerald-200/80 rounded-2xl bg-white/50 backdrop-blur-sm my-6">
      <div className="w-14 h-14 rounded-full bg-emerald-100/80 flex items-center justify-center text-emerald-600 mb-4">
        <FolderOpen className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

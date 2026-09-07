import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  highlightText?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  title,
  highlightText,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const renderTitle = () => {
    if (!highlightText) {
      return title;
    }
    const parts = title.split(new RegExp(`(${highlightText})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlightText.toLowerCase() ? (
        <span key={index} className="text-[#e6005c] font-extrabold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center max-w-3xl mx-auto",
        align === "right" && "text-right ml-auto max-w-3xl",
        align === "left" && "text-left max-w-3xl",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-gray-600 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

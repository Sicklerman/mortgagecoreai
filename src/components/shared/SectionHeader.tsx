import { cn } from "@/lib/utils";

interface Props {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({ badge, title, subtitle, centered = true, light = false, className }: Props) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {badge && (
        <div className={cn(
          "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border",
          light
            ? "bg-gold/10 text-gold border-gold/30"
            : "bg-gold/10 text-gold border-gold/20"
        )}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className={cn(
        "font-sora font-bold leading-tight mb-4",
        light ? "text-dark-text" : "text-off-white",
        "text-3xl md:text-4xl lg:text-5xl"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-base md:text-lg leading-relaxed max-w-2xl",
          centered && "mx-auto",
          light ? "text-muted" : "text-off-white/60"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

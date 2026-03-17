import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "green" | "blue" | "red";
}

const variants = {
  gold: "bg-gold/10 text-gold border-gold/30",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  red: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function GradientBadge({ children, className, variant = "gold" }: Props) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}

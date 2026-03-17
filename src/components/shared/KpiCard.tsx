import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  light?: boolean;
}

export function KpiCard({ label, value, sub, icon, trend, light }: Props) {
  return (
    <div className={cn(
      "rounded-xl border p-5",
      light
        ? "bg-white border-gray-200"
        : "bg-blue-deep/60 border-steel/30"
    )}>
      {icon && (
        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
          {icon}
        </div>
      )}
      <div className={cn(
        "text-xs font-bold uppercase tracking-widest mb-2",
        light ? "text-muted" : "text-off-white/50"
      )}>
        {label}
      </div>
      <div className={cn(
        "font-sora font-bold text-2xl",
        light ? "text-dark-text" : "text-off-white"
      )}>
        {value}
      </div>
      {sub && (
        <div className={cn(
          "text-xs mt-1.5",
          trend === "up" && "text-emerald-400",
          trend === "down" && "text-red-400",
          trend === "neutral" && "text-muted",
          !trend && "text-muted"
        )}>
          {sub}
        </div>
      )}
    </div>
  );
}

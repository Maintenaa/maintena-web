import { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

type Variant = "default" | "success" | "warning" | "danger" | "info";

export interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  variant?: Variant;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  variant = "default",
}: StatsCardProps) {
  const variantClassMap: Record<Variant, string> = {
    default: "text-primary",
    success: "text-teal-500",
    warning: "text-amber-500",
    danger: "text-rose-500",
    info: "text-sky-500",
  };

  const variantIconClassMap: Record<Variant, string> = {
    default: "text-primary",
    success: "text-teal-500",
    warning: "text-amber-500",
    danger: "text-rose-500",
    info: "text-sky-500",
  };

  return (
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className={`text-xl font-semibold ${variantClassMap[variant]}`}>
            {value}
          </div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
        <Icon className={`size-8 ${variantIconClassMap[variant]}`} />
      </div>
    </Card>
  );
}

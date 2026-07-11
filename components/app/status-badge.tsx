import { Badge } from "@/components/ui/badge";
import { AssetStatus, AssetPriority } from "@/modules/asset/dto/asset";

const statusConfig: Record<
  AssetStatus,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  operational: { label: "Operational", variant: "default" },
  inMaintenance: { label: "In Maintenance", variant: "secondary" },
  underRepair: { label: "Under Repair", variant: "secondary" },
  outOfService: { label: "Out of Service", variant: "destructive" },
  decommissioned: { label: "Decommissioned", variant: "outline" },
};

const priorityConfig: Record<
  AssetPriority,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  low: { label: "Low", variant: "outline" },
  medium: { label: "Medium", variant: "secondary" },
  high: { label: "High", variant: "destructive" },
  critical: { label: "Critical", variant: "destructive" },
};

export function StatusBadge({ value }: { value: AssetStatus }) {
  const config = statusConfig[value] || {
    label: value,
    variant: "outline" as const,
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PriorityBadge({ value }: { value: AssetPriority }) {
  const config = priorityConfig[value] || {
    label: value,
    variant: "outline" as const,
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

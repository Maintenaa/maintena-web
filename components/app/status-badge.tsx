import { Badge } from "@/components/ui/badge";
import { AssetStatus } from "@/modules/asset/dto/asset";

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

export function StatusBadge({ value }: { value: AssetStatus }) {
  const config = statusConfig[value] || {
    label: value,
    variant: "outline" as const,
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

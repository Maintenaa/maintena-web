import { BreadcrumbItem } from "@/components/nav-breadcrumb";
import PanelContent from "@/components/panel/panel-content";
import { Card } from "@/components/ui/card";

const breadcrumbs: BreadcrumbItem[] = [["Dashboard"]];

export default function Page() {
  return (
    <PanelContent breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="aspect-video rounded-xl bg-card" />
          <Card className="aspect-video rounded-xl bg-card" />
          <Card className="aspect-video rounded-xl bg-card" />
        </div>
        <Card className="min-h-screen rounded-xl bg-card" />
      </div>
    </PanelContent>
  );
}

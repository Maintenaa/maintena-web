import { BreadcrumbItem } from "@/components/nav-breadcrumb";
import PanelContent from "@/components/panel/panel-content";

const breadcrumbs: BreadcrumbItem[] = [["Dashboard"]];

export default function Page() {
  return (
    <PanelContent breadcrumbs={breadcrumbs}>
      <div className="space-y-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-screen rounded-xl bg-muted/50"></div>
      </div>
    </PanelContent>
  );
}

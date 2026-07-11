import PartList from "@/components/panel/part/part-list";
import PanelContent, {
  PanelContentHeader,
} from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMetaTitle } from "@/lib/metas";
import { panelUrl } from "@/lib/panels";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: getMetaTitle("Parts"),
};

export default function Page() {
  return (
    <PanelContent breadcrumbs={[["Parts"]]}>
      <PanelContentHeader
        title="Parts"
        action={
          <Button type="button" asChild>
            <Link href={panelUrl(`/parts/create`)}>
              <PlusIcon className="size-4" />
              Create
            </Link>
          </Button>
        }
      />

      <div className="space-y-4">
        <Card>
          <CardContent>
            <PartList />
          </CardContent>
        </Card>
      </div>
    </PanelContent>
  );
}

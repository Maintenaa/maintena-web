"use client";

import PositionList from "@/components/panel/position/position-list";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { usePanelContext } from "@/components/panel/panel-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Position } from "@/modules/position/dto/position";
import { useGetPositions } from "@/hooks/position/use-get-positions";
import { useDeletePosition } from "@/hooks/position/use-delete-position";
import { usePanelPath } from "@/lib/panels";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();
  const { panelUrl } = usePanelPath();
  const {
    query: { data: positionsData },
  } = useGetPositions();
  const { mutation: deletePositionMutation } = useDeletePosition();

  const [deletePosition, setDeletePosition] = useState<Position | null>(null);

  useEffect(() => {
    setBreadcrumbs([["Positions"]]);
  }, []);

  return (
    <>
      <PanelContentHeader
        title="Positions"
        action={
          <Button type="button" asChild>
            <Link href={panelUrl("/positions/create")}>
              <PlusIcon className="size-4" />
              Create
            </Link>
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="space-y-4">
            <PositionList
              data={positionsData?.data || []}
              onDelete={(data) => {
                setDeletePosition(data);
              }}
            />
          </div>
        </CardContent>
      </Card>

      <AlertConfirmDialog
        title="Delete Position"
        description={`Are you sure to delete position ${deletePosition?.name}`}
        open={!!deletePosition}
        onOpenChange={(val) => {
          if (!val) {
            setDeletePosition(null);
          }
        }}
        onConfirm={async () => {
          if (!deletePosition) return;
          try {
            await deletePositionMutation.mutateAsync(deletePosition.id);
            toast.success("Position deleted successfully");
            setDeletePosition(null);
          } catch (err) {
            toast.error(getErrorMessage(err));
          }
        }}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}

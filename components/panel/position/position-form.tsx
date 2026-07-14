"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Position } from "@/modules/position/dto/position";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import FormControl from "@/components/form/form-control";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePanelPath } from "@/lib/panels";
import { useCreatePosition } from "@/hooks/position/use-create-position";
import { useUpdatePosition } from "@/hooks/position/use-update-position";
import { PanelContentHeader } from "../panel-content";

const positionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isAdmin: z.boolean().default(false),
  isTechnician: z.boolean().default(false),
  isOwner: z.boolean().default(false),
});

type PositionFormValues = z.infer<typeof positionSchema>;

interface Props {
  position?: Position;
}

export default function PositionForm({ position }: Props) {
  const isEditMode = !!position;
  const router = useRouter();
  const { panelUrl } = usePanelPath();
  const { mutation: createPosition } = useCreatePosition();
  const { mutation: updatePosition } = useUpdatePosition();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: position?.name || "",
      isAdmin: position?.isAdmin || false,
      isTechnician: position?.isTechnician || false,
      isOwner: position?.isOwner || false,
    },
  });

  async function onSubmit(data: PositionFormValues) {
    try {
      const payload = {
        name: data.name,
        isAdmin: data.isAdmin,
        isTechnician: data.isTechnician,
        isOwner: data.isOwner,
      };

      if (isEditMode) {
        await updatePosition.mutateAsync({
          positionId: position.id,
          ...payload,
        });
        toast.success("Position updated successfully");
      } else {
        await createPosition.mutateAsync(payload);
        toast.success("Position created successfully");
      }

      router.push(panelUrl("/positions"));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PanelContentHeader
        title={isEditMode ? "Edit Position" : "Create Position"}
      />
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <FormControl
              control={control}
              name="name"
              label="Name"
              required
              render={({ field }) => (
                <Input placeholder="e.g. Manager" {...field} />
              )}
            />

            <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <FormControl
                control={control}
                name="isAdmin"
                label="Is Admin"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />

              <FormControl
                control={control}
                name="isTechnician"
                label="Is Technician"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />

              <FormControl
                control={control}
                name="isOwner"
                label="Is Owner"
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <SaveIcon className="size-4" />
          {isSubmitting ? "Saving...." : "Save"}
        </Button>
      </div>
    </form>
  );
}

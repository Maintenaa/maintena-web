"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormControl from "@/components/form/form-control";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePanelPath } from "@/lib/panels";
import { useCreatePartSupplier } from "@/hooks/part-supplier/use-create-part-supplier";
import { useUpdatePartSupplier } from "@/hooks/part-supplier/use-update-part-supplier";
import { PanelContentHeader } from "../panel-content";

const partSupplierSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional().default(""),
  email: z.string().optional().default(""),
  address: z.string().optional().default(""),
});

type PartSupplierFormValues = z.infer<typeof partSupplierSchema>;

interface Props {
  partSupplier?: PartSupplier;
}

export default function PartSupplierForm({ partSupplier }: Props) {
  const isEditMode = !!partSupplier;
  const router = useRouter();
  const { panelUrl } = usePanelPath();
  const { mutation: createPartSupplier } = useCreatePartSupplier();
  const { mutation: updatePartSupplier } = useUpdatePartSupplier();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(partSupplierSchema),
    defaultValues: {
      name: partSupplier?.name || "",
      phone: partSupplier?.phone || "",
      email: partSupplier?.email || "",
      address: partSupplier?.address || "",
    },
  });

  async function onSubmit(data: PartSupplierFormValues) {
    try {
      const payload = {
        name: data.name,
        phone: data.phone || undefined,
        email: data.email || undefined,
        address: data.address || undefined,
      };

      if (isEditMode) {
        await updatePartSupplier.mutateAsync({
          id: partSupplier.id,
          ...payload,
        });
        toast.success("Part supplier updated successfully");
      } else {
        await createPartSupplier.mutateAsync(payload);
        toast.success("Part supplier created successfully");
      }

      router.push(panelUrl("/part-suppliers"));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PanelContentHeader title={isEditMode ? "Edit Part Supplier" : "Create Part Supplier"} />
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <FormControl
              control={control}
              name="name"
              label="Name"
              required
              render={({ field }) => (
                <Input placeholder="Enter supplier name" {...field} />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormControl
                control={control}
                name="phone"
                label="Phone"
                render={({ field }) => (
                  <Input placeholder="e.g. +62 812 3456 7890" {...field} />
                )}
              />

              <FormControl
                control={control}
                name="email"
                label="Email"
                render={({ field }) => (
                  <Input placeholder="e.g. supplier@example.com" {...field} />
                )}
              />
            </div>

            <FormControl
              control={control}
              name="address"
              label="Address"
              render={({ field }) => (
                <Textarea
                  rows={3}
                  placeholder="Enter supplier address..."
                  {...field}
                />
              )}
            />
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

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Part } from "@/modules/part/dto/part";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormControl from "@/components/form/form-control";
import PartCategorySelect from "@/components/form/part-category-select";
import PartSupplierSelect from "@/components/form/part-supplier-select";
import LocationSelect from "@/components/form/location-select";
import { SaveIcon } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePanelPath } from "@/lib/panels";
import { useCreatePart } from "@/hooks/part/use-create-part";
import { useUpdatePart } from "@/hooks/part/use-update-part";
import { PanelContentHeader } from "../panel-content";
import { useState } from "react";
import { PartCategory } from "@/modules/part/dto/part-category";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";
import { Location } from "@/modules/location/dto/location";

const partSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().default(""),
  categoryId: z.string().min(1, "Category is required"),
  locationId: z.string().min(1, "Location is required"),
  supplierId: z.string().min(1, "Supplier is required"),
  quantity: z.coerce.number().min(0, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
  cost: z.coerce.number().min(0, "Cost is required"),
  expirationDate: z.string().optional().default(""),
  photo: z.string().optional().default(""),
});

type PartFormValues = z.infer<typeof partSchema>;

interface Props {
  part?: Part;
}

export default function PartForm({ part }: Props) {
  const isEditMode = !!part;
  const router = useRouter();
  const { panelUrl } = usePanelPath();
  const { mutation: createPart } = useCreatePart();
  const { mutation: updatePart } = useUpdatePart();

  const [selectedCategory, setSelectedCategory] = useState<
    PartCategory | null | undefined
  >(part?.category);
  const [selectedLocation, setSelectedLocation] = useState<
    Location | null | undefined
  >(part?.location);
  const [selectedSupplier, setSelectedSupplier] = useState<
    PartSupplier | null | undefined
  >(part?.supplier);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(partSchema),
    defaultValues: {
      code: part?.code || "",
      name: part?.name || "",
      description: part?.description || "",
      categoryId: part?.categoryId || "",
      locationId: part?.locationId || "",
      supplierId: part?.supplierId || "",
      quantity: part?.quantity || 0,
      unit: part?.unit || "",
      cost: part?.cost || 0,
      expirationDate: part?.expirationDate
        ? part.expirationDate.split("T")[0]
        : "",
      photo: part?.photo || "",
    },
  });

  function handleCategoryChange(value: PartCategory | null | undefined) {
    setSelectedCategory(value);
    setValue("categoryId", value?.id || "", { shouldValidate: true });
  }

  function handleLocationChange(value: Location | null | undefined) {
    setSelectedLocation(value);
    setValue("locationId", value?.id || "", { shouldValidate: true });
  }

  function handleSupplierChange(value: PartSupplier | null | undefined) {
    setSelectedSupplier(value);
    setValue("supplierId", value?.id || "", { shouldValidate: true });
  }

  async function onSubmit(data: PartFormValues) {
    try {
      const payload = {
        code: data.code,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        locationId: data.locationId,
        supplierId: data.supplierId,
        quantity: data.quantity,
        unit: data.unit,
        cost: data.cost,
        expirationDate: data.expirationDate || undefined,
        photo: data.photo,
      };

      if (isEditMode) {
        await updatePart.mutateAsync({
          partId: part.id,
          ...payload,
        });
        toast.success("Part updated successfully");
      } else {
        await createPart.mutateAsync(payload);
        toast.success("Part created successfully");
      }

      router.push(panelUrl("/parts"));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PanelContentHeader title={isEditMode ? "Edit Part" : "Create Part"} />
      <Card>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <FormControl
              control={control}
              name="code"
              label="Code"
              required
              render={({ field }) => (
                <Input placeholder="e.g. PRT-001" {...field} />
              )}
            />

            <FormControl
              control={control}
              name="name"
              label="Name"
              required
              render={({ field }) => (
                <Input placeholder="e.g. Air Filter" {...field} />
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormControl
                control={control}
                name="categoryId"
                label="Category"
                required
                render={() => (
                  <PartCategorySelect
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                  />
                )}
              />

              <FormControl
                control={control}
                name="locationId"
                label="Location"
                required
                render={() => (
                  <LocationSelect
                    value={selectedLocation}
                    onValueChange={handleLocationChange}
                  />
                )}
              />
            </div>

            <FormControl
              control={control}
              name="supplierId"
              label="Supplier"
              required
              render={() => (
                <PartSupplierSelect
                  value={selectedSupplier}
                  onValueChange={handleSupplierChange}
                />
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormControl
                control={control}
                name="quantity"
                label="Quantity"
                required
                render={({ field }) => (
                  <Input type="number" placeholder="0" {...field} />
                )}
              />

              <FormControl
                control={control}
                name="unit"
                label="Unit"
                required
                render={({ field }) => (
                  <Input placeholder="e.g. pcs, kg, liter" {...field} />
                )}
              />

              <FormControl
                control={control}
                name="cost"
                label="Cost"
                required
                render={({ field }) => (
                  <Input type="number" placeholder="0" {...field} />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormControl
                control={control}
                name="expirationDate"
                label="Expiration Date"
                render={({ field }) => <Input type="date" {...field} />}
              />

              <FormControl
                control={control}
                name="photo"
                label="Photo URL"
                render={({ field }) => (
                  <Input
                    placeholder="https://example.com/photo.jpg"
                    {...field}
                  />
                )}
              />
            </div>

            <FormControl
              control={control}
              name="description"
              label="Description"
              render={({ field }) => (
                <Textarea
                  rows={3}
                  placeholder="Additional notes about this part..."
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

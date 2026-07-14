"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Asset, AssetStatus } from "@/modules/asset/dto/asset";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetCategorySelect from "@/components/form/asset-category-select";
import LocationSelect from "@/components/form/location-select";
import FormControl from "@/components/form/form-control";
import {
  CalendarIcon,
  FlagIcon,
  GalleryThumbnailsIcon,
  GalleryVerticalIcon,
  LayoutIcon,
  SaveIcon,
} from "lucide-react";
import { AssetCategory } from "@/modules/asset/dto/asset-category";
import { Location } from "@/modules/location/dto/location";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePanelPath } from "@/lib/panels";
import { useCreateAsset } from "@/hooks/asset/use-create-asset";
import { useUpdateAsset } from "@/hooks/asset/use-update-asset";
import { Separator } from "@/components/ui/separator";
import { PanelContentHeader } from "../panel-content";

const assetSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional().default(""),
  categoryId: z.string().min(1, "Category is required"),
  locationId: z.string().min(1, "Location is required"),
  status: z.enum([
    "operational",
    "inMaintenance",
    "underRepair",
    "outOfService",
    "decommissioned",
  ]),
  lastMaintenanceAt: z.string().optional().default(""),
  installationDate: z.string().optional().default(""),
  expirationDate: z.string().optional().default(""),
  manufacturer: z.string().optional().default(""),
  model: z.string().optional().default(""),
  photo: z.string().optional().default(""),
});

type AssetFormValues = z.infer<typeof assetSchema>;

const STATUS_OPTIONS: { label: string; value: AssetStatus }[] = [
  { label: "Operational", value: "operational" },
  { label: "In Maintenance", value: "inMaintenance" },
  { label: "Under Repair", value: "underRepair" },
  { label: "Out of Service", value: "outOfService" },
  { label: "Decommissioned", value: "decommissioned" },
];

interface Props {
  asset?: Asset;
}

export default function AssetForm({ asset }: Props) {
  const isEditMode = !!asset;
  const router = useRouter();
  const { panelUrl } = usePanelPath();
  const { mutation: createAsset } = useCreateAsset();
  const { mutation: updateAsset } = useUpdateAsset();

  const [selectedCategory, setSelectedCategory] = useState<
    AssetCategory | null | undefined
  >(asset?.category);
  const [selectedLocation, setSelectedLocation] = useState<
    Location | null | undefined
  >(asset?.location);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      code: asset?.code || "",
      name: asset?.name || "",
      description: asset?.description || "",
      categoryId: asset?.categoryId || "",
      locationId: asset?.locationId || "",
      status: asset?.status || "operational",
      lastMaintenanceAt: asset?.lastMaintenanceAt
        ? asset.lastMaintenanceAt.split("T")[0]
        : "",
      installationDate: asset?.installationDate
        ? asset.installationDate.split("T")[0]
        : "",
      expirationDate: asset?.expirationDate
        ? asset.expirationDate.split("T")[0]
        : "",
      manufacturer: asset?.manufacturer || "",
      model: asset?.model || "",
      photo: asset?.photo || "",
    },
  });

  function handleCategoryChange(value: AssetCategory | null | undefined) {
    setSelectedCategory(value);
    setValue("categoryId", value?.id || "", { shouldValidate: true });
  }

  function handleLocationChange(value: Location | null | undefined) {
    setSelectedLocation(value);
    setValue("locationId", value?.id || "", { shouldValidate: true });
  }

  async function onSubmit(data: AssetFormValues) {
    try {
      const payload = {
        code: data.code,
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        locationId: data.locationId,
        status: data.status,
        lastMaintenanceAt: data.lastMaintenanceAt || undefined,
        installationDate: data.installationDate || undefined,
        expirationDate: data.expirationDate || undefined,
        manufacturer: data.manufacturer,
        model: data.model,
        photo: data.photo,
      };

      if (isEditMode) {
        await updateAsset.mutateAsync({
          assetId: asset.id,
          ...payload,
        });
        toast.success("Asset updated successfully");
      } else {
        await createAsset.mutateAsync(payload);
        toast.success("Asset created successfully");
      }

      router.push(panelUrl("/assets"));
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <PanelContentHeader title={isEditMode ? "Edit Asset" : "Create Asset"} />
      <Tabs
        className="flex gap-4 lg:flex-row flex-col"
        defaultValue="general"
        orientation="vertical"
      >
        <TabsList
          variant="default"
          className="shrink-0 lg:w-60 w-full h-auto py-1 bg-card border p-2 space-y-0.5"
        >
          <TabsTrigger
            value="general"
            className="flex items-center gap-2 justify-start py-1.5 px-3 cursor-pointer"
          >
            <LayoutIcon className="size-4" />
            General
          </TabsTrigger>
          <TabsTrigger
            value="model"
            className="flex items-center gap-2 justify-start py-1.5 px-3 cursor-pointer"
          >
            <FlagIcon className="size-4" />
            Model
          </TabsTrigger>
        </TabsList>
        <Card className="flex-1 min-w-0">
          <CardContent>
            <TabsContent value="general">
              <div className="grid grid-cols-1 gap-4">
                <FormControl
                  control={control}
                  name="code"
                  label="Code"
                  required
                  render={({ field }) => (
                    <Input placeholder="e.g. AST-001" {...field} />
                  )}
                />

                <FormControl
                  control={control}
                  name="name"
                  label="Name"
                  required
                  render={({ field }) => (
                    <Input placeholder="e.g. HVAC Unit A1" {...field} />
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormControl
                    control={control}
                    name="categoryId"
                    label="Category"
                    required
                    render={() => (
                      <AssetCategorySelect
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
                  name="status"
                  label="Status"
                  required
                  render={({ field }) => (
                    <NativeSelect {...field}>
                      {STATUS_OPTIONS.map((opt) => (
                        <NativeSelectOption key={opt.value} value={opt.value}>
                          {opt.label}
                        </NativeSelectOption>
                      ))}
                    </NativeSelect>
                  )}
                />

                <FormControl
                  control={control}
                  name="description"
                  label="Description"
                  render={({ field }) => (
                    <Textarea
                      rows={3}
                      placeholder="Additional notes about this asset..."
                      {...field}
                    />
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="model">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormControl
                    control={control}
                    name="manufacturer"
                    label="Manufacturer"
                    render={({ field }) => (
                      <Input placeholder="e.g. Daikin" {...field} />
                    )}
                  />

                  <FormControl
                    control={control}
                    name="model"
                    label="Model"
                    render={({ field }) => (
                      <Input placeholder="e.g. VRV IV Series" {...field} />
                    )}
                  />
                </div>

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

                <Separator />

                <div className="grid grid-cols-1 gap-4">
                  <FormControl
                    control={control}
                    name="installationDate"
                    label="Installation Date"
                    render={({ field }) => <Input type="date" {...field} />}
                  />

                  <FormControl
                    control={control}
                    name="lastMaintenanceAt"
                    label="Last Maintenance At"
                    render={({ field }) => <Input type="date" {...field} />}
                  />

                  <FormControl
                    control={control}
                    name="expirationDate"
                    label="Expiration Date"
                    render={({ field }) => <Input type="date" {...field} />}
                  />
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          <SaveIcon className="size-4" />
          {isSubmitting ? "Saving...." : "Save"}
        </Button>
      </div>
    </form>
  );
}

"use client";

import { AppFilter } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import LocationFormDialog from "@/components/panel/location/location-form-dialog";
import LocationList from "@/components/panel/location/location-list";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCompany } from "@/modules/company/context/company-context";
import { Location } from "@/modules/location/dto/location";
import {
  useGetLocationFilter,
  useGetLocations,
} from "@/modules/location/hook/use-get-locations";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

export default function Page() {
  const { currentCompany } = useCompany();

  const {
    query: { data: locationsData },
  } = useGetLocations({
    companyId: currentCompany?.id,
    enabled: !!currentCompany,
  });

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    search,
    setSearch,
    debouncedSearch,
  } = useGetLocationFilter();

  const [isCreate, setIsCreate] = useState(false);
  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [deleteLocation, setDeleteLocation] = useState<Location | null>(null);

  const filteredData = useMemo(
    () =>
      (locationsData?.data || []).filter((l) =>
        l.name.toLowerCase().includes(search?.toLowerCase() || ""),
      ),
    [locationsData?.data, debouncedSearch],
  );

  return (
    <>
      <PanelContentHeader
        title="Locations"
        action={
          <Button
            type="button"
            onClick={() => {
              setEditLocation(null);
              setIsCreate(true);
            }}
          >
            <PlusIcon className="size-4" />
            Create
          </Button>
        }
      />

      <Card>
        <CardContent>
          <div className="space-y-4">
            <AppFilter
              search={search}
              setSearch={setSearch}
              searchPlaceholder="Search locations..."
              perPage={perPage}
              setPerPage={setPerPage}
            />

            <LocationList
              data={filteredData}
              onEdit={(data) => {
                setEditLocation(data);
              }}
              onDelete={(data) => {
                setDeleteLocation(data);
              }}
              perPage={perPage}
              page={page}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </CardContent>
      </Card>

      <LocationFormDialog
        open={!!editLocation || isCreate}
        location={editLocation}
        onOpenChange={(val) => {
          if (!val) {
            setEditLocation(null);
            setIsCreate(false);
          }
        }}
      />

      <AlertConfirmDialog
        title="Delete Location"
        description={`Are you sure to delete location ${deleteLocation?.name}`}
        open={!!deleteLocation}
        onOpenChange={(val) => {
          if (!val) {
            setDeleteLocation(null);
          }
        }}
        onConfirm={() => {}}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}

"use client";

import { AppFilter } from "@/components/app/app-filter";
import { AlertConfirmDialog } from "@/components/app/confirm-dialog";
import LocationFormDialog from "@/components/panel/location/location-form-dialog";
import LocationList from "@/components/panel/location/location-list";
import { PanelContentHeader } from "@/components/panel/panel-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Location } from "@/modules/location/dto/location";
import { useCreateLocation } from "@/hooks/location/use-create-location";
import { useDeleteLocation } from "@/hooks/location/use-delete-location";
import { useUpdateLocation } from "@/hooks/location/use-update-location";
import {
  useGetLocationFilter,
  useGetLocations,
} from "@/hooks/location/use-get-locations";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePanelContext } from "@/components/panel/panel-provider";

export default function Page() {
  const { setBreadcrumbs } = usePanelContext();
  const {
    query: { data: locationsData },
  } = useGetLocations();

  useEffect(() => {
    setBreadcrumbs([["Locations"]]);
  }, []);

  const {
    page,
    setPage,
    perPage,
    setPerPage,
    search,
    setSearch,
    debouncedSearch,
  } = useGetLocationFilter();

  const { mutation: createLocation } = useCreateLocation();
  const { mutation: updateLocation } = useUpdateLocation();
  const { mutation: deleteLocationMutation } = useDeleteLocation();

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
        onSubmit={(data) => {
          if (editLocation) {
            updateLocation.mutate(
              { id: editLocation.id, name: data.name },
              {
                onSuccess: () => {
                  setEditLocation(null);
                },
              },
            );
          } else {
            createLocation.mutate(data, {
              onSuccess: () => {
                setIsCreate(false);
              },
            });
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
        onConfirm={() => {
          if (deleteLocation) {
            deleteLocationMutation.mutate(deleteLocation.id, {
              onSuccess: () => {
                setDeleteLocation(null);
              },
            });
          }
        }}
        confirmText="Delete"
        confirmVariant="destructive"
      />
    </>
  );
}

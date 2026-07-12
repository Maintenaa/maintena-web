"use client";

import FormControl from "@/components/form/form-control";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Location } from "@/modules/location/dto/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export interface LocationFormDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: z.infer<typeof validationSchema>) => void;
  location?: Location | null;
}

export default function LocationFormDialog({
  location,
  open,
  onOpenChange,
  onSubmit,
}: LocationFormDialogProps) {
  const { control, handleSubmit, setValues } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: location?.name || "",
    },
  });

  const handleOnSubmit = handleSubmit((data) => {
    if (onSubmit) onSubmit(data);
  });

  useEffect(() => {
    setValues({
      name: location?.name || "",
    });
  }, [location]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form method="post" onSubmit={handleOnSubmit} className="space-y-5">
          <DialogHeader>
            <DialogTitle>
              {location ? "Edit Location" : "Create Location"}
            </DialogTitle>
          </DialogHeader>

          <FormControl
            control={control}
            name="name"
            labelHtmlFor="name"
            label="Name"
            render={({ field }) => (
              <Input placeholder="Enter location name" {...field} />
            )}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">{location ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

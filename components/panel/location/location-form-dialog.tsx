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
import { Form, useForm } from "react-hook-form";
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
  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: location?.name || "",
    },
  });

  const handleSubmit = form.handleSubmit((d) => {
    if (onSubmit) onSubmit(d);
  });

  return (
    <form onSubmit={handleSubmit}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {location ? "Edit Location" : "Create Location"}
            </DialogTitle>
          </DialogHeader>

          <FormControl
            control={form.control}
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
        </DialogContent>
      </Dialog>
    </form>
  );
}

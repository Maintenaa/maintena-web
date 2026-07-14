"use client";

import { useGetLocations } from "@/hooks/location/use-get-locations";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useMemo, useRef, useState } from "react";
import { Location } from "@/modules/location/dto/location";
import { CheckIcon, SearchIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export interface LocationSelectProps {
  value?: Location | null;
  onValueChange?: (value: Location | null | undefined) => void;
}

export default function LocationSelect({
  value: initialValue,
  onValueChange,
}: LocationSelectProps) {
  const {
    query: { data },
  } = useGetLocations();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState<Location | null>(initialValue || null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(initialValue || null);
  }, [initialValue]);

  const [locations, setLocations] = useState<Location[]>(data?.data || []);

  const filteredLocations = useMemo(
    () =>
      locations.filter((l) =>
        l.name.toLowerCase().includes(input.toLowerCase()),
      ),
    [locations, input],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocations(data?.data || []);
  }, [data?.data]);

  function handleSelectLocation(location: Location) {
    const newLocation = value?.id === location.id ? null : location;
    setValue(newLocation);
    onValueChange?.(newLocation);
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setInput("");
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="justify-start w-full"
          >
            {value?.name || "Select Location"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Locations</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search location..."
              ref={inputRef}
            />
            <CommandList className="mt-3 overflow-y-auto max-h-[220px]">
              <CommandGroup>
                {filteredLocations.map((location) => (
                  <CommandItem
                    key={location.id}
                    className={[
                      "w-full flex items-center justify-between group gap-2",
                      value?.id === location.id ? "bg-primary/10" : "",
                    ].join(" ")}
                    onSelect={() => handleSelectLocation(location)}
                  >
                    <div className="flex-1 min-w-0">{location.name}</div>
                    <div className="flex items-center gap-2 order-last text-muted-foreground">
                      {value?.id === location.id && (
                        <CheckIcon className="size-4 text-primary" />
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

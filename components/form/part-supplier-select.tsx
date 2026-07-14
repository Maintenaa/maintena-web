"use client";

import { useGetPartSuppliers } from "@/hooks/part-supplier/use-get-part-suppliers";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useMemo, useRef, useState } from "react";
import { PartSupplier } from "@/modules/part-supplier/dto/part-supplier";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export interface PartSupplierSelectProps {
  value?: PartSupplier | null;
  onValueChange?: (value: PartSupplier | null | undefined) => void;
}

export default function PartSupplierSelect({
  value: initialValue,
  onValueChange,
}: PartSupplierSelectProps) {
  const {
    query: { data },
  } = useGetPartSuppliers();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState<PartSupplier | null>(initialValue || null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(initialValue || null);
  }, [initialValue]);

  const [partSuppliers, setPartSuppliers] = useState<PartSupplier[]>(data?.data || []);

  const filteredPartSuppliers = useMemo(
    () =>
      partSuppliers.filter((ps) =>
        ps.name.toLowerCase().includes(input.toLowerCase()),
      ),
    [partSuppliers, input],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPartSuppliers(data?.data || []);
  }, [data?.data]);

  function handleSelectPartSupplier(partSupplier: PartSupplier) {
    const newPartSupplier = value?.id === partSupplier.id ? null : partSupplier;
    setValue(newPartSupplier);
    onValueChange?.(newPartSupplier);
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
            {value?.name || "Select Part Supplier"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Part Suppliers</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search part supplier..."
              ref={inputRef}
            />
            <CommandList className="mt-3 overflow-y-auto max-h-[220px]">
              <CommandGroup>
                {filteredPartSuppliers.map((partSupplier) => (
                  <CommandItem
                    key={partSupplier.id}
                    className={[
                      "w-full flex items-center justify-between group gap-2",
                      value?.id === partSupplier.id ? "bg-primary/10" : "",
                    ].join(" ")}
                    onSelect={() => handleSelectPartSupplier(partSupplier)}
                  >
                    <div className="flex-1 min-w-0">{partSupplier.name}</div>
                    <div className="flex items-center gap-2 order-last text-muted-foreground">
                      {value?.id === partSupplier.id && (
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

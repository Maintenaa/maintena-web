"use client";

import { useGetPositions } from "@/hooks/position/use-get-positions";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useMemo, useRef, useState } from "react";
import { Position } from "@/modules/position/dto/position";
import { CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export interface PositionSelectProps {
  value?: Position | null;
  onValueChange?: (value: Position | null | undefined) => void;
}

export default function PositionSelect({
  value: initialValue,
  onValueChange,
}: PositionSelectProps) {
  const {
    query: { data },
  } = useGetPositions();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState<Position | null>(initialValue || null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(initialValue || null);
  }, [initialValue]);

  const [positions, setPositions] = useState<Position[]>(data?.data || []);

  const filteredPositions = useMemo(
    () =>
      positions.filter((p) =>
        p.name.toLowerCase().includes(input.toLowerCase()),
      ),
    [positions, input],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPositions(data?.data || []);
  }, [data?.data]);

  function handleSelectPosition(position: Position) {
    const newPosition = value?.id === position.id ? null : position;
    setValue(newPosition);
    onValueChange?.(newPosition);
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
            {value?.name || "Select Position"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Positions</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search position..."
              ref={inputRef}
            />
            <CommandList className="mt-3 overflow-y-auto max-h-[220px]">
              <CommandGroup>
                {filteredPositions.map((position) => (
                  <CommandItem
                    key={position.id}
                    className={[
                      "w-full flex items-center justify-between group gap-2",
                      value?.id === position.id ? "bg-primary/10" : "",
                    ].join(" ")}
                    onSelect={() => handleSelectPosition(position)}
                  >
                    <div className="flex-1 min-w-0">{position.name}</div>
                    <div className="flex items-center gap-2 order-last text-muted-foreground">
                      {value?.id === position.id && (
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

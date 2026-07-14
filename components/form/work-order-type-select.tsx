"use client";

import { useGetWorkOrderTypes } from "@/hooks/work-order-type/use-get-work-order-types";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useMemo, useRef, useState } from "react";
import { WorkOrderType } from "@/modules/work-order-type/dto/work-order-type";
import {
  CheckIcon,
  PenIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCreateWorkOrderType } from "@/hooks/work-order-type/use-create-work-order-type";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useDeleteWorkOrderType } from "@/hooks/work-order-type/use-delete-work-order-type";
import { useUpdateWorkOrderType } from "@/hooks/work-order-type/use-update-work-order-type";
import { AlertConfirmDialog } from "../app/confirm-dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export interface WorkOrderTypeSelectProps {
  value?: WorkOrderType | null;
  onValueChange?: (value: WorkOrderType | null | undefined) => void;
}

export default function WorkOrderTypeSelect({
  value: initialValue,
  onValueChange,
}: WorkOrderTypeSelectProps) {
  const {
    query: { data: data },
  } = useGetWorkOrderTypes();
  const { mutation: createWorkOrderType } = useCreateWorkOrderType();
  const { mutation: updateWorkOrderType } = useUpdateWorkOrderType();
  const { mutation: deleteWorkOrderType } = useDeleteWorkOrderType();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<WorkOrderType | null>(
    initialValue || null,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(initialValue || null);
  }, [initialValue]);

  const [deleteType, setDeleteType] = useState<WorkOrderType | null>(null);
  const [editType, setEditType] = useState<WorkOrderType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [types, setTypes] = useState<WorkOrderType[]>(
    data?.data || [],
  );

  const filteredTypes = useMemo(
    () =>
      types.filter((t) =>
        t.name.toLowerCase().includes(input.toLowerCase()),
      ),
    [types, input],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTypes(data?.data || []);
  }, [data?.data]);

  function resetForm() {
    setInput("");
    setDescription("");
    setEditType(null);
    setIsCreating(false);
  }

  async function handleCreateType() {
    try {
      const result = await createWorkOrderType.mutateAsync({
        name: input,
        description: description || null,
      });

      setTypes((prev) => [...prev, result.data]);
      resetForm();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleUpdateType() {
    if (!editType) return;

    try {
      const result = await updateWorkOrderType.mutateAsync({
        workOrderTypeId: editType.id,
        name: input,
        description: description || null,
      });

      setTypes((prev) =>
        prev.map((t) => (t.id === editType.id ? result.data : t)),
      );
      resetForm();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDeleteType() {
    if (!deleteType) return;

    try {
      await deleteWorkOrderType.mutateAsync(deleteType.id);
      setTypes((prev) => prev.filter((t) => t.id !== deleteType.id));
      setDeleteType(null);
      resetForm();
      setOpen(true);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  function handleSelectType(type: WorkOrderType) {
    const newType = value?.id === type.id ? null : type;

    setValue(newType);
    onValueChange?.(newType);
    setOpen(false);
  }

  function handleStartEdit(type: WorkOrderType) {
    setInput(type.name);
    setDescription(type.description || "");
    inputRef.current?.focus();
    setEditType(type);
    setIsCreating(false);
  }

  function handleStartCreate() {
    setIsCreating(true);
    setEditType(null);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            resetForm();
            setDeleteType(null);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="justify-start w-full"
          >
            {value?.name || "Select Work Order Type"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Work Order Types</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search work order type..."
              ref={inputRef}
            />
            <CommandList className="mt-3 overflow-y-auto max-h-[220px]">
              {filteredTypes.length === 0 && !editType && !isCreating && (
                <CommandItem forceMount onSelect={handleStartCreate}>
                  <PlusIcon className="size-4" />
                  Create
                </CommandItem>
              )}

              {(editType || isCreating) ? (
                <CommandGroup forceMount>
                  <div className="px-2 py-1 space-y-2">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">
                        Name
                      </Label>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter name..."
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">
                        Description
                      </Label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description (optional)..."
                        rows={2}
                      />
                    </div>
                  </div>
                  <CommandItem
                    forceMount
                    onSelect={editType ? handleUpdateType : handleCreateType}
                  >
                    <PenIcon className="size-4" />
                    {editType ? "Update" : "Create"}
                  </CommandItem>
                  <CommandItem
                    forceMount
                    onSelect={resetForm}
                    className="text-destructive"
                  >
                    <XIcon className="size-4" />
                    Cancel
                  </CommandItem>
                </CommandGroup>
              ) : (
                <CommandGroup>
                  {filteredTypes.map((type) => (
                    <CommandItem
                      key={type.id}
                      className={[
                        "w-full flex items-center justify-between group gap-2",
                        value?.id === type.id ? "bg-primary/10" : "",
                      ].join(" ")}
                    >
                      <div
                        onClick={() => handleSelectType(type)}
                        className="flex-1 min-w-0 h-full"
                      >
                        {type.name}
                      </div>
                      <div className="flex items-center gap-2 order-last text-muted-foreground">
                        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleStartEdit(type)}
                            className="cursor-pointer"
                          >
                            <PenIcon className="size-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteType(type)}
                            className="cursor-pointer"
                          >
                            <Trash2Icon className="size-3" />
                          </button>
                        </div>
                        {value?.id === type.id && (
                          <CheckIcon className="size-4 text-primary" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      <AlertConfirmDialog
        title="Delete Work Order Type"
        description="Are you sure to delete this work order type?"
        open={!!deleteType}
        onOpenChange={(val) => {
          if (!val) {
            setDeleteType(null);
          }
        }}
        onConfirm={handleDeleteType}
      />
    </>
  );
}

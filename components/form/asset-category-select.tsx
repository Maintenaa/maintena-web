"use client";

import { useGetAssetCategories } from "@/hooks/asset/use-get-asset-categories";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useEffect, useMemo, useRef, useState } from "react";
import { AssetCategory } from "@/modules/asset/dto/asset-category";
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
import { useCreateAssetCategory } from "@/hooks/asset/use-create-asset-category";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { useDeleteAssetCategory } from "@/hooks/asset/use-delete-asset-category";
import { useUpdateAssetCategory } from "@/hooks/asset/use-update-asset-category";
import { AlertConfirmDialog } from "../app/confirm-dialog";

export interface AssetCategorySelectProps {
  value?: AssetCategory | null;
  onValueChange?: (value: AssetCategory | null | undefined) => void;
}

export default function AssetCategorySelect({
  value: initialValue,
  onValueChange,
}: AssetCategorySelectProps) {
  const {
    query: { data: data },
  } = useGetAssetCategories();
  const { mutation: createAssetCategory } = useCreateAssetCategory();
  const { mutation: updateAssetCategory } = useUpdateAssetCategory();
  const { mutation: deleteAssetCategory } = useDeleteAssetCategory();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [value, setValue] = useState<AssetCategory | null>(
    initialValue || null,
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(initialValue || null);
  }, [initialValue]);

  const [deleteCategory, setDeleteCategory] = useState<AssetCategory | null>(
    null,
  );
  const [editCategory, setEditCategory] = useState<AssetCategory | null>(null);

  const [categories, setCategories] = useState<AssetCategory[]>(
    data?.data || [],
  );

  const filteredCategories = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(input.toLowerCase()),
      ),
    [categories, input],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategories(data?.data || []);
  }, [data?.data]);

  async function handleCreateCategory() {
    try {
      const result = await createAssetCategory.mutateAsync(input);

      setCategories((prev) => [...prev, result.data]);
      setInput("");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleUpdateCategory() {
    if (!editCategory) return;

    try {
      const result = await updateAssetCategory.mutateAsync({
        categoryId: editCategory.id,
        name: input,
      });

      setCategories((prev) =>
        prev.map((c) => (c.id == editCategory.id ? { ...c, name: input } : c)),
      );
      setInput("");
      setEditCategory(null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function handleDeleteCategory() {
    if (!deleteCategory) return;

    try {
      await deleteAssetCategory.mutateAsync(deleteCategory.id);
      setCategories((prev) => prev.filter((c) => c.id !== deleteCategory.id));
      setDeleteCategory(null);
      setInput("");
      setOpen(true);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  function handleSelectCategory(category: AssetCategory) {
    const newCategory = value?.id == category.id ? null : category;

    setValue(newCategory);
    onValueChange?.(newCategory);
    setOpen(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v) {
            setEditCategory(null);
            setDeleteCategory(null);
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
            {value?.name || "Select Category"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Categories</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput
              value={input}
              onValueChange={setInput}
              placeholder="Search category..."
              ref={inputRef}
            />
            <CommandList className="mt-3 overflow-y-auto max-h-[220px]">
              {filteredCategories.length === 0 && !editCategory && (
                <CommandItem forceMount onSelect={handleCreateCategory}>
                  <PlusIcon className="size-4" />
                  Create
                </CommandItem>
              )}

              {editCategory ? (
                <CommandGroup forceMount>
                  <CommandItem forceMount onSelect={handleUpdateCategory}>
                    <PenIcon className="size-4" />
                    Update
                  </CommandItem>
                  <CommandItem
                    forceMount
                    onSelect={() => {
                      setEditCategory(null);
                      setInput("");
                    }}
                    className="text-destructive"
                  >
                    <XIcon className="size-4" />
                    Cancel
                  </CommandItem>
                </CommandGroup>
              ) : (
                <CommandGroup>
                  {filteredCategories.map((category) => (
                    <CommandItem
                      key={category.id}
                      className={[
                        "w-full flex items-center justify-between group gap-2",
                        value?.id == category.id ? "bg-primary/10" : "",
                      ].join(" ")}
                    >
                      <div
                        onClick={() => handleSelectCategory(category)}
                        className="flex-1 min-w-0 h-full"
                      >
                        {category.name}
                      </div>
                      <div className="flex items-center gap-2 order-last text-muted-foreground">
                        <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => {
                              setInput(category.name);
                              inputRef.current?.focus();
                              setEditCategory(category);
                            }}
                            className="cursor-pointer"
                          >
                            <PenIcon className="size-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteCategory(category)}
                            className="cursor-pointer"
                          >
                            <Trash2Icon className="size-3" />
                          </button>
                        </div>
                        {value?.id == category.id && (
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
        title="Delete Category"
        description="Are you sure to delete this category?"
        open={!!deleteCategory}
        onOpenChange={(val) => {
          if (!val) {
            setDeleteCategory(null);
          }
        }}
        onConfirm={handleDeleteCategory}
      />
    </>
  );
}

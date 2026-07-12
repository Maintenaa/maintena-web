import { FilterIcon, SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export function AppFilter({
  searchPlaceholder,
  search,
  setSearch,
  perPages = [10, 25, 50, 100],
  perPage,
  setPerPage,
  other,
}: {
  searchPlaceholder?: string;
  search?: string;
  setSearch?: (search: string) => void;
  perPages?: number[];
  perPage?: number;
  setPerPage?: (perPage: number) => void;
  other?: React.ReactNode;
}) {
  return (
    <div className="flex items-center flex-wrap gap-3">
      <div className="lg:flex-1 w-full min-w-0">
        <div className="relative">
          <Input
            className="pl-10"
            placeholder={searchPlaceholder || "Search..."}
            value={search}
            onChange={(e) => {
              if (setSearch) setSearch(e.currentTarget.value);
            }}
          />
          <div className="absolute top-0 left-0 bottom-0 w-10 flex items-center justify-center pointer-events-none">
            <SearchIcon className="size-4" />
          </div>
        </div>
      </div>

      <Select
        value={perPage?.toString()}
        onValueChange={(value) => {
          if (setPerPage) setPerPage(Number(value));
        }}
      >
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Limit Per Page" />
        </SelectTrigger>
        <SelectContent>
          {perPages.map((perPage, i) => (
            <SelectItem key={i} value={perPage.toString()}>
              {perPage} per page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {other && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" type="button">
              <FilterIcon className="size-4" />
              Filter Data
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 max-w-full p-3">
            {other}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}

export function AppFilterOther({
  children,
  onReset,
  onSubmit,
}: {
  children: React.ReactNode;
  onReset?: () => void;
  onSubmit?: () => void;
}) {
  return (
    <div className="space-y-3">
      {children}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onReset}>
          Reset
        </Button>
        <Button type="button" onClick={onSubmit}>
          Filter
        </Button>
      </div>
    </div>
  );
}

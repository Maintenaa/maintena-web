import { SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function AppFilter({
  searchPlaceholder,
  search,
  setSearch,
  perPages = [10, 25, 50, 100],
  perPage,
  setPerPage,
}: {
  searchPlaceholder?: string;
  search?: string;
  setSearch?: (search: string) => void;
  perPages?: number[];
  perPage?: number;
  setPerPage?: (perPage: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex-1 min-w-0">
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
        <SelectTrigger className="w-40">
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
    </div>
  );
}

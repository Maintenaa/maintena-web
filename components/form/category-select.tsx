import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";

export interface CategorySelectProps<T> {
  items: T[];
  value?: T;
  onValueChange?: (value?: T | null) => void;
  render: (item: T) => React.ReactNode;
  placeholder?: string;
  itemToStringValue?: ((itemValue: T) => string) | undefined;
}

export function CategorySelect<T>({
  items,
  value,
  onValueChange,
  render,
  placeholder = "Select options",
  itemToStringValue,
}: CategorySelectProps<T>) {
  return (
    <Combobox
      items={items}
      value={value}
      onValueChange={onValueChange}
      itemToStringValue={itemToStringValue}
    >
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item, i) => (
            <ComboboxItem key={i} value={item}>
              {render(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

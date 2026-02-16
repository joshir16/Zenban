import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import React, { memo } from "react";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ElementType;
  color?: string;
}

interface SelectMenuProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

function SelectMenu({
  value,
  onValueChange,
  options,
  placeholder,
}: SelectMenuProps) {
  const selectedOption = options.find((opt) => opt.value === value);
  const TriggerIcon = selectedOption?.icon;

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={`flex text-sm items-center gap-2 px-2 py-1 rounded-lg border border-background-500 hover:bg-white/10 transition-colors outline-none ${
          selectedOption?.color || ""
        }`}
      >
        <div className="flex items-center gap-2">
          {TriggerIcon && <TriggerIcon size={15} />}
          <Select.Value placeholder={placeholder}>
            {selectedOption?.label}
          </Select.Value>
        </div>
        <Select.Icon>
          <ChevronDown size={14} className="ml-1" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="overflow-hidden bg-[#1e1e1e] border border-background-500 rounded-lg shadow-xl min-w-35 z-50 animate-in fade-in zoom-in-95 duration-100"
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={`relative flex items-center gap-2 px-2 py-1 text-sm rounded-sm outline-none cursor-pointer select-none data-highlighted:bg-white/5 ${
                  option.color || ""
                }`}
              >
                <Select.ItemIndicator className="absolute right-1">
                  <Check size={14} />
                </Select.ItemIndicator>

                {option.icon && (
                  <option.icon size={16} className="opacity-70" />
                )}
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
export default memo(SelectMenu);

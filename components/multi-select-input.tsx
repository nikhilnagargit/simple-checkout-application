"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

import { useEffect } from "react";
import { ShippingZoneFormValues } from "./shippingzone-form";
import { UseFormReturn } from "react-hook-form";

// List of categorized countries
interface RegionType {
  name: string;
  countries: string[];
}

const Regions: RegionType[] = [
  {
    name: "Asia",
    countries: ["India", "China", "Japan", "Russia", "Afganistan"],
  },
  {
    name: "Europe",
    countries: [
      "Greece",
      "England",
      "Scottland",
      "Viena",
      "Purtogal",
      "Denmark",
      "Finland",
    ],
  },
  {
    name: "North America",
    countries: ["Guatemala", "Canada", "USA", "Mexico"],
  },
  {
    name: "Africa",
    countries: ["South Africa", "Indonesia", "Somalia"],
  },
];

// List of all countries
function getAllcountries() {
  let countries: string[] = [];
  Regions.forEach((region) => {
    countries = [...countries, ...region.countries];
  });
  return countries;
}

const AllCountries = getAllcountries();

export function FancyMultiSelect({
  selectedItems,
  onChangeSelection,
  disabled,
  form,
}: {
  selectedItems: string[];
  onChangeSelection: (...event: any[]) => void;
  disabled: boolean;
  form: UseFormReturn<ShippingZoneFormValues>;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([...selectedItems]);
  // const [selected, setSelected] = React.useState<string[]>(
  //   form.getValues("countries")
  // );
  const [inputValue, setInputValue] = React.useState("");

  useEffect(() => {
    // onChangeSelection(selected);

    form.setValue("countries", selected);
  }, [selected]);

  const handleUnselect = React.useCallback((country: string) => {
    setSelected((prev) => prev.filter((s) => s !== country));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = AllCountries.filter(
    (country) => !selected.includes(country)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent">
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((country) => {
            return (
              <Badge key={country} variant="secondary">
                {country}
                <button
                  disabled={disabled}
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(country);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(country)}>
                  {!disabled && (
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  )}
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            name="countries"
            disabled={disabled}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="type name..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <div className="overflow-auto h-[200px] border border-primary">
              {Regions.map((region) => {
                return (
                  <CommandGroup key={region.name}>
                    {region.countries.some((country) =>
                      selectables.includes(country)
                    ) && (
                      <CommandItem
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onSelect={(value) => {
                          setInputValue("");
                          setSelected((prev) => {
                            // only keeping unique values in state
                            const newState = [...prev, ...region.countries];
                            const set = new Set(newState);
                            const newArr = Array.from(set);
                            return newArr;
                          });
                        }}
                        className="font-semibold text-primary">
                        {region.name}
                      </CommandItem>
                    )}
                    {region.countries.map(
                      (country) =>
                        selectables.includes(country) && (
                          <CommandItem
                            className="ml-2 cursor-pointer"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onSelect={(value) => {
                              setInputValue("");
                              setSelected((prev) => [...prev, country]);
                            }}
                            key={country}>
                            {country}
                          </CommandItem>
                        )
                    )}
                  </CommandGroup>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

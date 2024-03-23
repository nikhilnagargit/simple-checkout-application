import React from "react";
import { ShippingZoneFormValues } from "./shippingzone-form";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CirclePlus, CornerDownRight, X } from "lucide-react";

const ShippingMethodInput = ({
  form,
  shippingMethodIndex,
  disabled,
}: {
  form: UseFormReturn<ShippingZoneFormValues>;
  shippingMethodIndex: number;
  disabled: boolean;
}) => {
  // range fields
  const { fields, append, remove } = useFieldArray({
    name: `shippingMethods.${shippingMethodIndex}.ranges`,
    control: form.control,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-8 gap-4 text-muted-foreground text-sm">
        <div className="col-span-2">Min Weight</div>
        <div className="col-span-2">Max Weight</div>
        <div className="col-span-2">Amount</div>
      </div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="grid grid-cols-8 gap-4">
            <div className="col-span-2">
              <FormField
                disabled={disabled}
                control={form.control}
                name={`shippingMethods.${shippingMethodIndex}.ranges.${index}.from`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={disabled}
                        placeholder="From"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                disabled={disabled}
                control={form.control}
                name={`shippingMethods.${shippingMethodIndex}.ranges.${index}.to`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="To" {...field} type="number" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                disabled={disabled}
                control={form.control}
                name={`shippingMethods.${shippingMethodIndex}.ranges.${index}.amount`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Amount" {...field} type="number" />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-1 flex">
              {!disabled && (
                <Button
                  type="button"
                  className="text-destructive col-span-1"
                  variant={"ghost"}
                  title="Add row"
                  onClick={() => {
                    if (index !== 0) remove(index);
                  }}>
                  <X size={20}></X>
                </Button>
              )}
              {(index === fields.length - 1 || !fields) && !disabled && (
                <Button
                  type="button"
                  className="text-primary col-span-1"
                  variant={"ghost"}
                  title="Add row"
                  onClick={() => {
                    append({ from: 0, to: 0, amount: 0 });
                  }}>
                  <CirclePlus size={20}></CirclePlus>
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShippingMethodInput;

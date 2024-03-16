"use client";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CirclePlus,
  CloudUpload,
  Cross,
  Minus,
  Pen,
  Pencil,
  Trash,
  X,
} from "lucide-react";
import { FancyMultiSelect } from "./multi-select-input";
import { cn } from "@/lib/utils";

// defining shipping zone form shhema using zod
const shippingZoneFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(20, {
      message: "Name must be less than 20 characters.",
    }),

  countries: z.array(z.string()),
  shippingMethods: z.array(
    z.object({
      name: z.string(),
      ranges: z.array(
        z.object({
          from: z.number(),
          to: z.number(),
          amount: z.number(),
        })
      ),
    })
  ),
});

// defining the type for output object of form through zod validation
export type ShippingZoneFormValues = z.infer<typeof shippingZoneFormSchema>;

interface ShippingZoneFormProps {
  editMode: boolean;
  defaultValues: Partial<ShippingZoneFormValues>;
}

// main form component of this page
const ShippingZoneForm = ({
  editMode,
  defaultValues,
}: ShippingZoneFormProps) => {
  // define the toast component
  const { toast } = useToast();

  const form = useForm<ShippingZoneFormValues>({
    resolver: zodResolver(shippingZoneFormSchema),
    defaultValues,
    mode: "onChange",
  });

  // just show the submitted data in a toast
  function onSubmit(data: ShippingZoneFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const { fields, append, remove } = useFieldArray({
    name: "shippingMethods",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-2">
            <FormField
              disabled={!editMode}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Zone Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={!editMode}
              control={form.control}
              name="countries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Countries</FormLabel>
                  <FormControl>
                    <FancyMultiSelect
                      onChangeSelection={field.onChange}
                      selectedItems={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-4">
              <FormLabel>Add Shipping Methods</FormLabel>
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`shippingMethods.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="border p-4 grid grid-cols-7 rounded-md items-center justify-items-center gap-2">
                          <Input
                            {...field}
                            placeholder="Name"
                            className={cn(
                              " border-x-0 col-span-6 border-t-0 focus-visible:ring-transparent focus:ring-0 focus-visible:border-b-primary rounded-none"
                            )}
                          />
                          <Button
                            type="button"
                            className="text-destructive col-span-1"
                            variant={"ghost"}
                            title="Delete Shipping Method"
                            onClick={() => {
                              remove(index);
                            }}>
                            <Trash size={20}></Trash>
                          </Button>

                          <div className="col-span-2 flex items-center">
                            <Input
                              // {...field}
                              placeholder="min weight (gm)"
                              className={cn(
                                "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
                              )}
                            />
                            <p>-</p>
                          </div>
                          <div className="col-span-2">
                            <Input
                              // {...field}
                              placeholder="max weight (gm)"
                              className={cn(
                                "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
                              )}
                            />
                          </div>
                          <div className="col-span-2 flex items-center">
                            <p>$</p>
                            <Input
                              // {...field}
                              placeholder="amount"
                              className={cn(
                                "border-x-0 col-span-3 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
                              )}
                            />
                          </div>

                          <Button
                            type="button"
                            className="text-primary col-span-1"
                            variant={"ghost"}
                            title="Add row">
                            <CirclePlus size={20}></CirclePlus>
                          </Button>
                          <FormMessage />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                onClick={() => append({ name: "", ranges: [] })}>
                + Add Method
              </Button>
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          <Button type="submit" disabled={!editMode}>
            Save
          </Button>
          <Button type="button" variant={"destructive"} disabled={!editMode}>
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShippingZoneForm;

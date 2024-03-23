"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast, useToast } from "@/components/ui/use-toast";
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
  Router,
  Trash,
  X,
} from "lucide-react";
import { FancyMultiSelect } from "./multi-select-input";
import ShippingMethodInput from "./shippingmethod-input";
import { useRouter } from "next/navigation";

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
          from: z.coerce.number().positive(),
          to: z.coerce.number().positive(),
          amount: z.coerce.number().positive(),
        })
      ),
    })
  ),
});

// defining the type for output object of form through zod validation
export type ShippingZoneFormValues = z.infer<typeof shippingZoneFormSchema>;

// This can come from your database or API.

const defaultValues: Partial<ShippingZoneFormValues> = {
  name: "Asian Countries",
  countries: ["India", "Japan", "Russia"],

  shippingMethods: [
    {
      name: "DHL Express",
      ranges: [
        { from: 100, to: 400, amount: 34 },
        { from: 300, to: 400, amount: 334 },
      ],
    },
  ],
};

export default function ShippingZoneForm({ editMode }: { editMode: boolean }) {
  const router = useRouter();
  const form = useForm<ShippingZoneFormValues>({
    resolver: zodResolver(shippingZoneFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "shippingMethods",
    control: form.control,
  });

  function onSubmit(data: ShippingZoneFormValues) {
    // navigate to details view again
    router.back();
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              disabled={!editMode}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shipping Zone" {...field} />
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
                  <FancyMultiSelect
                    disabled={!editMode}
                    onChangeSelection={field.onChange}
                    selectedItems={field.value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Shipping Methods</FormLabel>
              {/* here fields = shipping method items */}

              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border p-4 rounded-md grid grid-cols-7 gap-4">
                  <div className="col-span-6">
                    <FormField
                      disabled={!editMode}
                      control={form.control}
                      name={`shippingMethods.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Name"
                              className="border-x-0 col-span-6 border-t-0 focus-visible:ring-transparent focus-visible:border-b-primary rounded-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {index !== 0 && (
                    <Button
                      type="button"
                      className="text-destructive col-span-1"
                      variant={"ghost"}
                      title="Delete Shipping Method"
                      onClick={() => {
                        if (index !== 0) remove(index);
                      }}>
                      <Trash size={20}></Trash>
                    </Button>
                  )}
                  <div className="col-span-7">
                    <ShippingMethodInput
                      disabled={!editMode}
                      form={form}
                      shippingMethodIndex={index}
                    />
                  </div>
                </div>
              ))}
              {editMode && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    append({
                      name: "",
                      ranges: [{ from: 0, to: 0, amount: 0 }],
                    })
                  }>
                  + Add New Method
                </Button>
              )}
            </div>
            {editMode && (
              <div className="flex gap-6">
                <Button type="submit" disabled={!editMode}>
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

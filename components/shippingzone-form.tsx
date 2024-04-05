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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { Trash, X } from "lucide-react";
import { FancyMultiSelect } from "./multi-select-input";
import ShippingMethodInput from "./shippingmethod-input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShippingZone } from "./shippingzone-table";
import { createClient } from "@/utils/supabase/client";
import { watch } from "fs";
import { tree } from "next/dist/build/templates/app-page";

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
  shipping_methods: z.array(
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

export default function ShippingZoneForm({
  editMode,
  shippingZone_id,
}: {
  editMode: boolean;
  shippingZone_id?: string;
}) {
  const [shippingZone, setShippingZone] = useState<ShippingZone | undefined>(
    undefined
  );

  // to refresh the form field countries whenever the form field countries changes
  const [myKey, setMyKey] = useState<string>("sdf");

  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const form = useForm<ShippingZoneFormValues>({
    resolver: zodResolver(shippingZoneFormSchema),
    defaultValues: {
      name: "",
      countries: [],
      shipping_methods: [
        {
          name: "",
          ranges: [{ from: 0, to: 0, amount: 0 }],
        },
      ],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    name: "shipping_methods",
    control: form.control,
  });
  // side effects
  useEffect(() => {
    // function declaration only
    async function fetchShippingZone() {
      let { data: shipping_zones, error } = await supabase
        .from("shipping_zones")
        .select("*")
        .eq("id", shippingZone_id);

      if (error) {
        console.log(error);
      } else {
        setShippingZone(() => (shipping_zones ? shipping_zones[0] : undefined));
        if (shipping_zones) {
          form.setValue("name", shipping_zones[0].name);
          form.setValue("countries", shipping_zones[0].countries);
          form.setValue("shipping_methods", shipping_zones[0].shipping_methods);
          // changing key, so that form countries component gets rerendered
          setMyKey("sdfsdfd");
        }
      }
    }
    // fetch the product , if there is existing product_id prop
    if (shippingZone_id) {
      // function call
      fetchShippingZone();
    }
  }, []);

  async function onSubmit(formdata: ShippingZoneFormValues) {
    const session = await supabase.auth.getSession();

    // check if user session is there
    if (session) {
      if (editMode && !shippingZone_id) {
        // create new record if current shipping zone id doest not exists

        const { data, error } = await supabase
          .from("shipping_zones")
          .insert([{ ...formdata, user_id: session.data.session?.user.id }])
          .select();

        if (error) {
          toast({
            title: "Shipping Zone creation failed",
            description: (
              <p className="text-destructive">
                {error.message + " " + error.code}
              </p>
            ),
          });
        } else {
          toast({
            title: "Shipping Zone created successfully.",
            description: <p className="text-green-700">{"1 item inserted."}</p>,
          });
          // go to the previous page
          router.back();
        }
      } else if (editMode) {
        // update existing record, if shipping zone id already exists.
        const { data, error } = await supabase
          .from("shipping_zones")
          .update([{ ...formdata }])
          .eq("user_id", session.data.session?.user.id)
          .eq("id", shippingZone_id)
          .select();

        if (error) {
          toast({
            title: "Shipping Zone update failed",
            description: (
              <p className="text-destructive">
                {error.message + " " + error.code}
              </p>
            ),
          });
        } else {
          toast({
            title: "Shipping Zone updated successfully.",
            description: <p className="text-green-700">{"1 item updated"}</p>,
          });
        }

        // go to the details page
        router.replace("/shipping/" + shippingZone_id);
      }
    }
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
            <div key={myKey}>
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
                      form={form}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      name={`shipping_methods.${index}.name`}
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
                  {index !== 0 && editMode && (
                    <Button
                      type="button"
                      className="text-destructive col-span-1"
                      variant={"ghost"}
                      title="Delete Shipping Method"
                      onClick={() => {
                        if (index !== 0) remove(index);
                      }}>
                      <Trash size={15}></Trash>
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant={"outline"}
                      disabled={!editMode}>
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Discard the changes?</AlertDialogTitle>
                      <AlertDialogDescription>
                        All the changed you made to this form will be lost.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction>
                        <Link href={`/shipping/${shippingZone_id}`}>Yes</Link>
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}

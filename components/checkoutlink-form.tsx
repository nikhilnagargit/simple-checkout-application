"use client";

import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

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
import { useState } from "react";
import { CloudUpload, Copy } from "lucide-react";
import Image from "next/image";
const checkoutLinkFormSchema = z.object({
  product_id: z.string(),
  shippingzone_id: z.string(),
  shippingmethod_id: z.string(),
  quantity: z.coerce.number(),
});

// defining the type for output object of form through zod validation
export type CheckoutLinkFormValues = z.infer<typeof checkoutLinkFormSchema>;

interface CheckoutLinkFormProps {
  editMode: boolean;
  productId?: string;
}

const CheckoutLinkForm = ({ editMode, productId }: CheckoutLinkFormProps) => {
  // define the toast component
  const { toast } = useToast();
  const [checkoutlink, setCheckoutLink] = useState<string>("");

  const form = useForm<CheckoutLinkFormValues>({
    resolver: zodResolver(checkoutLinkFormSchema),
    mode: "onSubmit",
    defaultValues: { quantity: 1, product_id: productId },
  });

  function onSubmit(data: CheckoutLinkFormValues) {
    console.log(data);
    setCheckoutLink("https://checkoutexample.com/ghfro948484/2");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          console.log("errors");
          console.log(form.formState.errors);
        })}
        className="space-y-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            <FormField
              disabled={!editMode}
              control={form.control}
              name="product_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!editMode}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="728ed52f">Chair</SelectItem>
                      <SelectItem value="12345d52f">Laptop</SelectItem>
                      <SelectItem value="32r23ntttr3">
                        Think and Learn Book
                      </SelectItem>
                      <SelectItem value="23r3dfsrr34rg">
                        Network Adapter
                      </SelectItem>
                      <SelectItem value="23r3trsdfffrrg">
                        Cards Deck - glass
                      </SelectItem>
                      <SelectItem value="23r3dt3r4rrrg">
                        Cards Deck - furniture
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={!editMode}
              control={form.control}
              name="shippingzone_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Shipping Zone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!editMode}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sdfa43f43fsd">
                        Asian Countries
                      </SelectItem>
                      <SelectItem value="34dsfaf4ffasd">
                        Home Country
                      </SelectItem>
                      <SelectItem value="sd34rfdsfa345">USA</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={!editMode}
              control={form.control}
              name="shippingmethod_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!editMode}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electro3443nics">
                        DHL Express
                      </SelectItem>
                      <SelectItem value="Homsdfor">Blue Dart</SelectItem>
                      <SelectItem value="Cussdfzed">UPS</SelectItem>
                      <SelectItem value="GifsdfItem">
                        Amazone Delivery
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={!editMode}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="number of units"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-6  col-span-6 justify-between">
              <Button type="submit">Generate Link</Button>
              {checkoutlink !== "" && (
                <div className="flex gap-2 flex-1">
                  <Input
                    type="text"
                    placeholder="chekcoutlink"
                    value={checkoutlink}
                    readOnly
                    className=" bg-secondary"
                  />
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() => {
                      navigator.clipboard.writeText(checkoutlink);
                      toast({ title: "Link copied" });
                    }}>
                    <Copy size={20} />
                    Copy
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-1 space-y-4">
            <FormField
              control={form.control}
              name="shippingmethod_id"
              disabled={!editMode}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="text-muted-foreground w-[200px] h-[200px] border flex flex-col items-center justify-center relative">
                      <Image
                        alt="img"
                        fill={true}
                        sizes="w-full h-full"
                        src={"/images/laptop.jpg"}></Image>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutLinkForm;

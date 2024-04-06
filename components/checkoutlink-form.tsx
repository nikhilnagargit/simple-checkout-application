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
import { useEffect, useState } from "react";
import { CloudUpload, Copy } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Product } from "./product-table";
import { ShippingMethod, ShippingZone } from "./shippingzone-table";
import ImageUploader from "./image-uploader";
import { useRouter } from "next/navigation";
const checkoutLinkFormSchema = z.object({
  product_id: z.string(),
  shippingzone_id: z.string(),
  shippingmethod_name: z.string(),
  quantity: z.coerce.number(),
});

// defining the type for output object of form through zod validation
export type CheckoutLinkFormValues = z.infer<typeof checkoutLinkFormSchema>;

interface CheckoutLinkFormProps {
  editMode: boolean;
  productId?: string;
}

const CheckoutLinkForm = ({ editMode, productId }: CheckoutLinkFormProps) => {
  const { toast } = useToast();
  const [checkoutlink, setCheckoutLink] = useState<string>("");
  const supabase = createClient();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([]);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [image, setImage] = useState<string>("");
  const [flag, setFlag] = useState<string>("sdf");
  const form = useForm<CheckoutLinkFormValues>({
    resolver: zodResolver(checkoutLinkFormSchema),
    mode: "onSubmit",
    defaultValues: { quantity: 1, product_id: productId?.toString() },
  });

  async function onSubmit(formdata: CheckoutLinkFormValues) {
    const session = await supabase.auth.getSession();
    // check if user session is there.
    if (session) {
      const { data, error }: any = await supabase
        .from("checkout_links")
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
        // set the checkout link state so that link will be shown to user
        const preparelink =
          process.env.NEXT_PUBLIC_HOST_PREFIX! +
          process.env.NEXT_PUBLIC_CHECKOUTLINK_ROUTE! +
          "/" +
          data[0].id +
          "?quantity=" +
          data[0].quantity;

        setCheckoutLink(preparelink);

        toast({
          title: "Checkout Link Generated.",
          description: (
            <p className="text-green-700">{"Copy and Share the link"}</p>
          ),
        });
        // go to the previous page
        // router.back();
      }
    }

    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(formdata, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
  }
  // change the options for shipping methods dropdown, based on the shipping zone dropdown value changes
  useEffect(() => {
    const id = form.getValues("shippingzone_id");
    if (id) {
      const zones = shippingZones.filter((zone) => zone.id.toString() === id);
      if (zones) {
        const zone = zones[0];
        if (zone) {
          const methods = zone.shipping_methods;
          setShippingMethods(methods);
        }
      }
    }
  }, [form.watch("shippingzone_id")]);

  // change the image, whenever new product is selected in the dropdown
  useEffect(() => {
    if (products.length !== 0) {
      const id = form.getValues("product_id");
      if (id) {
        const current_product: Product = products.filter(
          (p, idx) => p.id.toString() === id
        )[0];
        setImage(current_product.image);
      }
    }
  }, [form.watch("product_id"), flag]);

  // fetch the records,when page loads
  useEffect(() => {
    async function fetchProducts() {
      const { data: products, error } = await supabase
        .from("products")
        .select("*");
      if (error) {
        console.log(error);
      } else {
        setProducts(() => products);
      }
      // change the flag so that other useEffect runs, to change the image after dataload
      setFlag("sdfsd");
    }

    // function declaration only
    async function fetchShippingZones() {
      const { data: shipping_zones, error } = await supabase
        .from("shipping_zones")
        .select("*");
      if (error) {
        console.log(error);
      } else {
        setShippingZones(() => shipping_zones);
      }
    }

    // function call
    fetchShippingZones();

    // call the fetch products function
    fetchProducts();
  }, []);

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
                      {products.map((product, idx) => {
                        return (
                          <SelectItem
                            key={product.id.toString()}
                            value={product.id.toString()}>
                            {product.name}
                          </SelectItem>
                        );
                      })}
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
                      {shippingZones.map((shipping_zone, idx) => {
                        return (
                          <SelectItem
                            key={shipping_zone.id.toString()}
                            value={shipping_zone.id.toString()}>
                            {shipping_zone.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={!editMode}
              control={form.control}
              name="shippingmethod_name"
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
                      {shippingMethods?.map((shipping_method, idx) => (
                        <SelectItem key={idx} value={shipping_method.name}>
                          {shipping_method.name}
                        </SelectItem>
                      ))}
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
            {image !== "" && (
              <FormField
                control={form.control}
                name="shippingmethod_name"
                disabled={!editMode}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selected Product</FormLabel>
                    <FormControl>
                      <div className="hover:bg-muted relative max-w-[250px] h-[200px] border-dashed border-2 text-muted-foreground rounded-md flex flex-col items-center justify-center">
                        <Image
                          alt="img"
                          fill={true}
                          sizes="w-full h-auto"
                          src={image}
                          priority
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CheckoutLinkForm;

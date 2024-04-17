"use client";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
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

import {
  Form,
  FormControl,
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
import { useRouter } from "next/navigation";
import ImageUploader from "./image-uploader";
import { createClient } from "@/utils/supabase/client";
import { Product } from "./product-table";
import { useEffect, useState } from "react";
import Link from "next/link";

// define the zod schema for porduct form
const productFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(30, {
      message: "Product name must be less than 20 characters.",
    }),
  description: z.string().max(100, {
    message: "Product description must be less than 100 characters.",
  }),
  category: z.string({
    required_error: "Please select a category to display.",
  }),
  type: z.string(),
  weight: z.coerce
    .number({ required_error: "select quantity" })
    .nonnegative()
    .optional(),
  price: z.coerce
    .number({ required_error: "select quantity" })
    .nonnegative({ message: "positive number required" }),
  quantity: z.coerce
    .number({ required_error: "select quantity" })
    .nonnegative(),
  image: z
    .string({ required_error: "select an image" })
    .url({ message: "please upload an image" }),
});

// defining the type for output object of form through zod validation
export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  editMode: boolean;
  product_id?: string;
}

const ProductForm = ({ editMode, product_id }: ProductFormProps) => {
  //dont't delete product state.
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const supabase = createClient();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      type: "physical",
      weight: 0,
      price: 0,
      quantity: 0,
      image: "",
    },
    mode: "onSubmit",
  });

  // side effects
  useEffect(() => {
    // function declaration only
    async function fetchProduct() {
      let { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", product_id);

      if (error) {
        console.log(error);
      } else {
        setProduct(() => (products ? products[0] : undefined));
        if (products) {
          form.setValue("name", products[0].name);
          form.setValue("description", products[0].type);
          form.setValue("weight", products[0].weight);
          form.setValue("image", products[0].image);
          form.setValue("price", products[0].price);
          form.setValue("category", products[0].category);
          form.setValue("quantity", products[0].quantity);
        }
      }
    }
    // fetch the product , if there is existing product_id prop
    if (product_id) {
      // function call
      fetchProduct();
      console.log("fetching product");
    }
    console.log("effect running");
  }, [form, product_id, supabase]);

  async function onSubmit(formdata: ProductFormValues) {
    const session = await supabase.auth.getSession();

    // check if user session is there
    if (session) {
      if (editMode && !product_id) {
        // create new record if current prduct id doest not exists
        const { data, error } = await supabase
          .from("products")
          .insert([{ ...formdata, user_id: session.data.session?.user.id }])
          .select();
        if (error) {
          toast({
            title: "Product creation failed",
            description: (
              <p className="text-destructive">
                {error.message + " " + error.code}
              </p>
            ),
          });
        } else {
          toast({
            title: "Product created successfully.",
            description: <p className="text-green-700">{"1 item inserted."}</p>,
          });
        }

        // go to the previous page
        router.back();
      } else if (editMode) {
        // update existing record, if product id already exists.
        const { data, error } = await supabase
          .from("products")
          .update([{ ...formdata }])
          .eq("user_id", session.data.session?.user.id)
          .eq("id", product_id)
          .select();

        if (error) {
          toast({
            title: "Product update failed",
            description: (
              <p className="text-destructive">
                {error.message + " " + error.code}
              </p>
            ),
          });
        } else {
          toast({
            title: "Product updated successfully.",
            description: <p className="text-green-700">{"1 item updated"}</p>,
          });
        }

        // go to the details page
        router.replace("/products/" + product_id);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          console.log(form.formState.errors);
        })}
        className="space-y-2">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-2">
            <FormField
              disabled={!editMode}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={!editMode}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell about your product"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>type you description here.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={!editMode}
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!editMode}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Home Decor">Home Decor</SelectItem>
                      <SelectItem value="Customized">Customized</SelectItem>
                      <SelectItem value="Gift Item">Gift Item</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={!editMode}
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      disabled={!editMode}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1">
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="digital" />
                        </FormControl>
                        <FormLabel className="font-normal">Digital</FormLabel>
                      </FormItem>

                      <FormItem className="flex space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="physical" />
                        </FormControl>
                        <FormLabel className="font-normal">Physical</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                  {field.value === "physical" && (
                    <FormField
                      control={form.control}
                      disabled={!editMode}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight in grams</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Weight in grams"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={!editMode}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price in $</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
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
                  <FormLabel>Quantitiy in stock</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 col-span-1">
            <ImageUploader form={form} disabled={!editMode} />
          </div>
        </div>
        {editMode && (
          <div className="flex gap-4">
            <Button type="submit" disabled={!editMode}>
              Save Product
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant={"outline"} disabled={!editMode}>
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
                    <Link href={`/products/${product_id}`}>Yes</Link>
                  </AlertDialogAction>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ProductForm;

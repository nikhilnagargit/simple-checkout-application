"use client";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useToast } from "@/components/ui/use-toast";
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
import { useEffect } from "react";

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
  product?: Product;
}

const ProductForm = ({ editMode, product }: ProductFormProps) => {
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

  useEffect(() => {
    if (product) {
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("quantity", product.quantity);
      form.setValue("type", product.type);
      form.setValue("weight", product.weight);
      form.setValue("image", product.image);
      form.setValue("price", product.price);
      form.setValue("category", product.category);
    }
  });

  async function onSubmit(formdata: ProductFormValues) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .insert([formdata])
      .select();
    if (error) {
      toast({
        title: "Product creation failed",
        description: (
          <p className="text-destructive">{error.message + " " + error.code}</p>
        ),
      });
      return;
    }

    toast({
      title: "Product created successfully.",
      description: <p className="text-green-700">{"1 item inserted."}</p>,
    });

    router.back();
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
                    <Input placeholder="" {...field} />
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
          <Button type="submit" disabled={!editMode}>
            Save Product
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ProductForm;

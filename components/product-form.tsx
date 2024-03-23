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

import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";

const productFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Product name must be at least 2 characters.",
    })
    .max(20, {
      message: "Product name must be less than 20 characters.",
    }),
  description: z
    .string()
    .max(100, {
      message: "Product description must be less than 100 characters.",
    })
    .optional(),
  category: z.string({
    required_error: "Please select a category to display.",
  }),
  type: z.enum(["digital", "physical"], {
    required_error: "You need to select a product type.",
  }),
  weight: z.coerce.number().optional(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  image: z.string().optional(),
});

// defining the type for output object of form through zod validation
export type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductFormProps {
  editMode: boolean;
  defaultValues: Partial<ProductFormValues>;
}

const ProductForm = ({ editMode, defaultValues }: ProductFormProps) => {
  // define the toast component
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProductFormValues) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    router.back();
  }

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
                    disabled={!editMode}>
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
                  {/* <FormDescription>
                    Select the category for product.
                  </FormDescription> */}
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
            <FormField
              control={form.control}
              disabled={!editMode}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <div className="text-muted-foreground w-[200px] h-[200px] border flex flex-col items-center justify-center">
                      <CloudUpload size={50} strokeWidth={1} />
                      <p>Upload Image</p>
                      {/* <Input type="file" {...field}/> */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

import React from "react";

import ProductForm, { ProductFormValues } from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

// This can come from database or API.
const defaultValues: Partial<ProductFormValues> = {
  name: "Car",
  description: "best car",
  category: "Gift Item",
  type: "digital",
  weight: 16660,
  price: 88880,
  quantity: 80,
  image: "",
};

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          View Product Details
        </h2>
        <div className="flex gap-4 justify-end">
          <Link href={`/products/${params.id}/edit`}>
            <Button variant={"outline"} className="text-primary">
              <Pencil></Pencil>
            </Button>
          </Link>
          <Button variant={"outline"} className="text-destructive">
            <Trash></Trash>
          </Button>
        </div>
      </div>
      <ProductForm editMode={false} defaultValues={defaultValues} />
    </div>
  );
};

export default page;

import React from "react";

import ProductForm, { ProductFormValues } from "@/components/product-form";
import { Pencil, Trash, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
        <div className="flex gap-4 justify-end">
          <Link href={`/products/${params.id}`}>
            <Button variant={"outline"} className="text-destructive">
              <X></X>
            </Button>
          </Link>
        </div>
      </div>

      <ProductForm editMode={true} product_id={params.id} />
    </div>
  );
};

export default page;

"use client";

import React, { useEffect, useState } from "react";
import ProductForm, { ProductFormValues } from "@/components/product-form";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Product } from "@/components/product-table";
import { createClient } from "@/utils/supabase/client";

const page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const supabase = createClient();
  useEffect(() => {
    async function fetchProduct() {
      let { data: products, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id);

      if (error) {
        console.log(error);
      } else {
        setProduct(() => (products ? products[0] : undefined));
      }
    }

    fetchProduct();
  }, []);
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
      <ProductForm editMode={false} product={product} />
    </div>
  );
};

export default page;

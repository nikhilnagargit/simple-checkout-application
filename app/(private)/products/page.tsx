import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductTable, Product, columns } from "@/components/product-table";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Link href={"products/create"}>
          <Button size={"sm"} variant={"default"}>
            <Plus size={20}></Plus>
            Add Product
          </Button>
        </Link>
      </div>
      <div className="w-full mx-auto">
        <ProductTable />
      </div>
    </div>
  );
};

export default page;

import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ProductTable, Product, columns } from "@/components/product-table";
import Link from "next/link";

const data: Product[] = [
  {
    id: "728ed52f",
    name: "Chair",
    status: "Active",
    price: 20,
    category: "Home",
    type: "Physical",
    quantity: 23,
    description:
      "The awsome chair to get comfortable lorum ipsum in the best random text on behalf has the finest coffee and sense logic.",
    created: "23/04/2024",
  },
  {
    id: "12345d52f",
    name: "Laptop",
    status: "Active",
    price: 20,
    category: "Home",
    type: "Physical",
    quantity: 23,
    description:
      "The awsome chair to get comfortable lorum ipsum in the best random text on behalf has the finest coffee and sense logic.",
    created: "23/04/2024",
  },
  {
    id: "66726552f",
    name: "Chair",
    status: "Active",
    price: 20,
    category: "Home",
    type: "Physical",
    quantity: 23,
    description:
      "The awsome chair to get comfortable lorum ipsum in the best random text on behalf has the finest coffee and sense logic.",
    created: "23/04/2024",
  },
];

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
        <ProductTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;

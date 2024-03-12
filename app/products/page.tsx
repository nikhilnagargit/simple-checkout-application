import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, Payment, columns } from "@/components/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const page = async () => {
  const data = await getData();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <Button size={"sm"} variant={"default"}>
          <Plus size={20}></Plus>
          Add Product
        </Button>
      </div>
      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;

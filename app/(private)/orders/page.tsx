import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrdersTable } from "@/components/orders-table";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Recent Orders</h2>
      </div>
      <div className="w-full mx-auto">
        <OrdersTable />
      </div>
    </div>
  );
};

export default page;

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ShippingZoneTable } from "@/components/shippingzone-table";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Shipping Zones</h2>
        <Link href={"shipping/create"}>
          <Button size={"sm"} variant={"default"}>
            <Plus size={15}></Plus>
            Add Zone
          </Button>
        </Link>
      </div>
      <div className="w-full mx-auto">
        <ShippingZoneTable />
      </div>
    </div>
  );
};

export default page;

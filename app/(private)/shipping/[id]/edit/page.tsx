import React from "react";

import ShippingZoneForm from "@/components/shippingzone-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Edit Shipping Zone
        </h2>
      </div>
      <ShippingZoneForm editMode={true} shippingZone_id={params.id} />
    </div>
  );
};

export default page;

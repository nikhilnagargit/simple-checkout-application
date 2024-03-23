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
          Shipping Zone Details
        </h2>
        <div className="flex gap-4 justify-end">
          <Link href={`/shipping/${params.id}/edit`}>
            <Button variant={"outline"} className="text-primary">
              <Pencil></Pencil>
            </Button>
          </Link>
          <Button variant={"outline"} className="text-destructive">
            <Trash></Trash>
          </Button>
        </div>
      </div>
      <ShippingZoneForm editMode={false} />
    </div>
  );
};

export default page;

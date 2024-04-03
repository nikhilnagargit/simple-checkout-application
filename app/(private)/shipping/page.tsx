import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  ShippingZoneTable,
  ShippingZone,
  columns,
} from "@/components/shippingzone-table";
import Link from "next/link";

const data: ShippingZone[] = [
  {
    id: "61234554",
    name: "Asian Countries",
    countries: ["India", "Japan", "Russia"],
    status: "Active",
    created: "23/12/2023",
    shippingMethods: [
      {
        id: "123",
        name: "DHL Express",
        ranges: [{ from: 100, to: 400, amount: 34 }],
      },
    ],
  },
  {
    id: "934543554",
    name: "Asian Countries",
    countries: ["India", "Japan", "Russia"],
    status: "Active",
    created: "23/12/2023",
    shippingMethods: [
      {
        id: "123",
        name: "DHL Express",
        ranges: [{ from: 100, to: 400, amount: 34 }],
      },
    ],
  },
  {
    id: "734552254",
    name: "Asian Countries",
    countries: ["India", "Japan", "Russia"],
    status: "Active",
    created: "23/12/2023",
    shippingMethods: [
      {
        id: "123",
        name: "DHL Express",
        ranges: [{ from: 100, to: 400, amount: 34 }],
      },
    ],
  },
];

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
        <ShippingZoneTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;

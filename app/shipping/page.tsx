import React from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  ShippingZoneTable,
  ShippingZone,
  columns,
} from "@/components/shippingzone-table";
import Link from "next/link";

async function getData(): Promise<ShippingZone[]> {
  // Fetch data from your API here.
  return [
    {
      id: "61234554",
      name: "Asian Countries",
      countries: ["India", "Japan", "Russia"],
      status: "Active",
      created: "23/12/2023",
      method: [
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
      method: [
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
      method: [
        {
          id: "123",
          name: "DHL Express",
          ranges: [{ from: 100, to: 400, amount: 34 }],
        },
      ],
    },
  ];
}

const page = async () => {
  const data = await getData();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between ">
        <h2 className="text-3xl font-bold tracking-tight">Shipping Zones</h2>
        <Link href={"products/create"}>
          <Button size={"sm"} variant={"default"}>
            <Plus size={20}></Plus>
            Create New Zone
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

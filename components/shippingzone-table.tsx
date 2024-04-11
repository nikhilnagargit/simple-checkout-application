"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import ShippingZoneTableRowActions from "./shippingzone-tabel-row-actions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";

// define the types

export type Range = {
  from: number;
  to: number;
  amount: number;
};
export type ShippingMethod = {
  name: string;
  ranges: Range[];
};
export type ShippingZone = {
  id: string;
  name: string;
  countries: string[];
  created_at: string;
  status: string;
  shipping_methods: ShippingMethod[];
};

// set the columm definition
export const Columns = ({ handleDelete }: any): ColumnDef<ShippingZone>[] => [
  {
    accessorKey: "name",
    header: "ShippingZone",
    cell: ({ row }) => {
      const shipping_zone = row.original;
      return (
        <Link
          href={"/shipping/" + shipping_zone.id}
          className="flex gap-2 items-center">
          <div className="">{shipping_zone.name}</div>
        </Link>
      );
    },
  },
  {
    cell: ({ row }) => {
      return <div>Active</div>;
    },
    header: "Status",
  },
  {
    // accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div>{date.toLocaleDateString()}</div>;
    },
    header: "Created",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const shipping_zone = row.original;
      return (
        <ShippingZoneTableRowActions
          shipping_zone={shipping_zone}
          handleDelete={handleDelete}
        />
      );
    },
  },
];

export function ShippingZoneTable() {
  const [shippingZoneData, setShippingZoneData] = useState<ShippingZone[]>([]);
  const supabase = createClient();
  const router = useRouter();

  // utility function to delete the shipping zone
  async function handleDelete(shippingzone_id: string) {
    const session = await supabase.auth.getSession();
    // check if user session is there
    if (session) {
      // delete the current record

      const { error } = await supabase
        .from("shipping_zones")
        .delete()
        .eq("id", shippingzone_id)
        .eq("user_id", session.data.session?.user.id);
      // if error in deletion
      if (error) {
        toast({
          title: "Delete failed.",
          description: (
            <p className="text-destructive">
              {error.message + " " + error.code + " " + error.details}
            </p>
          ),
        });
      } else {
        // refresh the page
        // router.replace("/products");
        location.reload();
      }
    }
  }

  useEffect(() => {
    async function fetchShippingZones() {
      const { data: shipping_zones, error } = await supabase
        .from("shipping_zones")
        .select("*");

      if (error) {
        console.log(error);
      } else {
        setShippingZoneData(() => shipping_zones);
      }
    }
    fetchShippingZones();
  }, [supabase]);

  const table = useReactTable({
    data: shippingZoneData,
    columns: Columns({ handleDelete }),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="hover:text-primary"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Columns(handleDelete).length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}

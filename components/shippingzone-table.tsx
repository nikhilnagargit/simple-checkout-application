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
import { Copy, Eye, MoreVertical, Pencil, ShipIcon, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// define the types

export type Range = {
  from: number;
  to: number;
  amount: number;
};
export type ShippingMethod = {
  id: string;
  name: string;
  ranges: Range[];
};
export type ShippingZone = {
  id: string;
  name: string;
  countries: string[];
  created: string;
  status: "Active" | "Inactive";
  method: ShippingMethod[];
};

// set the columm definition
export const columns: ColumnDef<ShippingZone>[] = [
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created",
    header: "Created On",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const shipping_zone = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <Link href={`/shipping/${shipping_zone.id}`}>
              <DropdownMenuItem className="flex gap-1 items-center">
                <Eye size={15} />
                View
              </DropdownMenuItem>
            </Link>
            <Link href={`/shipping/edit/${shipping_zone.id}`}>
              <DropdownMenuItem className="flex gap-1 items-center">
                <Pencil size={15} />
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex gap-1 items-center text-destructive">
              <Trash size={15} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface ShippingZoneTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ShippingZoneTable<TData, TValue>({
  columns,
  data,
}: ShippingZoneTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
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
                  colSpan={columns.length}
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

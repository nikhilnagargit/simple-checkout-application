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
import { Copy, Eye, MoreVertical, Pencil, Trash } from "lucide-react";
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
export type Product = {
  id: string;
  name: string;
  category: string;
  type: "Digital" | "Physical";
  price: number;
  quantity: number;
  description: string;
  created: string;
  status: "Active" | "Inactive";
};

// set the columm definition
export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link
          href={"/products/" + product.id}
          className="flex gap-2 items-center">
          <Image
            alt="img"
            height={44}
            width={44}
            src={"/images/laptop.jpg"}></Image>
          <div className="">{product.name}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "created",
    header: "Created",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
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
            <DropdownMenuItem
              className="flex gap-1 items-center"
              onClick={() => navigator.clipboard.writeText(product.id)}>
              <Copy size={15} />
              Copy product ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/products/${product.id}`}>
              <DropdownMenuItem className="flex gap-1 items-center">
                <Eye size={15} />
                View
              </DropdownMenuItem>
            </Link>
            <Link href={`/products/edit/${product.id}`}>
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

interface ProductTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ProductTable<TData, TValue>({
  columns,
  data,
}: ProductTableProps<TData, TValue>) {
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

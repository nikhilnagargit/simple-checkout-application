"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowSelection,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

// define the types
export type Product = {
  id: string;
  name: string;
  category: string;
  type: string;
  price: number;
  quantity: number;
  description: string;
  created_at: string;
  status: string;
  image: string;
  weight: number;
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
          <Image alt="img" height={44} width={44} src={product.image}></Image>
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
    // accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div className="">{date.toLocaleDateString()}</div>;
    },
    header: "Created",
  },
  {
    // accessorKey: "status",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.original.quantity > 0 ? "active" : "out of stock"}
        </div>
      );
    },
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-muted-foreground">
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
              <Link href={`/products/${product.id}/edit`}>
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

          <Button
            asChild
            size={"sm"}
            variant={"secondary"}
            className="border-primary border h-8">
            <Link href={`/checkout/${product.id}`}> Generate Link</Link>
          </Button>
        </div>
      );
    },
  },
];

export function ProductTable() {
  const [productData, setProductData] = useState<Product[]>([]);
  const supabase = createClient();

  async function fetchProducts() {
    const { data: products, error } = await supabase
      .from("products")
      .select("*");
    if (error) {
      console.log(error);
    } else {
      setProductData(() => products);
    }
    // setData(() => products);
  }
  useEffect(() => {
    fetchProducts();
  }, []);
  const table = useReactTable({
    data: productData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col space-y-2">
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

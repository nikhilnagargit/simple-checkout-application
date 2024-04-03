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

import Image from "next/image";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import ProductTableRowActions from "./product-table-row-actions";

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
export const Columns = ({ handleDelete }: any): ColumnDef<Product>[] => [
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
        <ProductTableRowActions product={product} handleDelete={handleDelete} />
      );
    },
  },
];

export function ProductTable() {
  const [productData, setProductData] = useState<Product[]>([]);
  const supabase = createClient();
  const router = useRouter();
  // utility function to delete the products.
  async function handleDelete(product_id: string) {
    const session = await supabase.auth.getSession();
    // check if user session is there
    if (session) {
      // delete the current record
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product_id)
        .eq("user_id", session.data.session?.user.id);
      // if error in deletion
      if (error) {
        toast({
          title: "Delete failed.",
          description: (
            <p className="text-destructive">
              {error.message + " " + error.code}
            </p>
          ),
        });
      }
      // refresh the page
      // router.replace("/products");
      location.reload();
    }
  }

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
    columns: Columns({ handleDelete }),
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

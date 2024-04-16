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
import { Product } from "./product-table";

// define the types
export type Order = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal: string;
  phone: string;
  email: string;
  product_id: number;
  quantity: number;
  payment_method: string;
  stripe_checkout_session_id: string;
  user_id: string;
  payment_status: string;
  product: Product;
};

// set the columm definition
export const Columns = (): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <Link
          href={"/order/" + order.id}
          className="flex gap-2 items-center relative">
          {order.id}
        </Link>
      );
    },
  },

  {
    // accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div>{date.toLocaleDateString()}</div>;
    },
    header: "Created On",
  },
  {
    cell: ({ row }) => {
      return <div>{row.original.payment_method}</div>;
    },
    header: "Payment Method",
  },
  {
    header: "Product",
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex gap-2 items-center relative">
          <Image
            alt="img"
            height={"40"}
            width={"40"}
            src={order.product.image}></Image>
          <div className="">{order.product.name}</div>
        </div>
      );
    },
  },
  {
    // accessorKey: "status",
    cell: ({ row }) => {
      return <div className="">{row.original.payment_status}</div>;
    },
    header: " Payment Status",
  },
];

export function OrdersTable() {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*, product:product_id(*)");
      console.log(orders);
      if (error) {
        console.log(error);
      } else {
        setOrderData(() => orders);
      }
    }
    fetchOrders();
  }, [supabase]);

  const table = useReactTable({
    data: orderData,
    columns: Columns(),
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
                  colSpan={Columns().length}
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

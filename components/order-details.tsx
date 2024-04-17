"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OrderDetails = ({ order_data }: any) => {
  const date = new Date(order_data.created_at);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <div className="flex col-span-2 gap-2">
          <h3 className="">Order ID :</h3>
          <h2 className="font-semibold">{order_data.id}</h2>
        </div>
        <div className="flex col-span-1 gap-2">
          <h3 className="">Create On :</h3>
          <h2 className="font-semibold">{date.toLocaleString()}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Payment Method:</h3>
          <h2 className="font-semibold">{order_data.payment_method}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Payment Status :</h3>
          <h2 className="font-semibold">{order_data.payment_status}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Product :</h3>
          <h2 className="font-semibold text-right">
            {order_data.product.name}
          </h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Order Quantity :</h3>
          <h2 className="font-semibold text-right">{order_data.quantity}</h2>
        </div>
      </div>
      <hr />

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        <h2 className="font-semibold col-span-2">Customer Details</h2>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Name :</h3>
          <h2 className="font-semibold">
            {order_data.first_name + " " + order_data.last_name}
          </h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Email :</h3>
          <h2 className="font-semibold">{order_data.email}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Phone :</h3>
          <h2 className="font-semibold text-right">{order_data.phone}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Address :</h3>
          <h2 className="font-semibold text-right">{order_data.address}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Postal Code :</h3>
          <h2 className="font-semibold text-right">{order_data.postal}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">City :</h3>
          <h2 className="font-semibold text-right">{order_data.city}</h2>
        </div>
        <div className="flex col-span-1 gap-4">
          <h3 className="">Country :</h3>
          <h2 className="font-semibold text-right">sdfsdf</h2>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

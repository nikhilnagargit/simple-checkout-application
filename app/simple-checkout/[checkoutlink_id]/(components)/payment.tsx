"use client";

import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Payment = () => {
  const [selectedValue, setSelectedValue] = useState("creditcard");

  const handleChange = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <Card className=" shadow-md">
      <CardHeader>
        <CardTitle>Payment Mode</CardTitle>
        <CardDescription>
          All transactions are secure and encrypted. Select a payment method to
          proceed.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-col border rounded-md">
          {/* Paypal  */}
          <div className="w-full flex rounded-md h-full">
            <input
              type="radio"
              id="paypal"
              value="paypal"
              checked={selectedValue === "paypal"}
              onChange={() => handleChange("paypal")}
              className={`hidden`}
            />
            <Label
              htmlFor="paypal"
              className={`cursor-pointer rounded-md relative flex items-center justify-between w-full transition-colors h-12 p-4 ${
                selectedValue === "paypal" ? "border border-primary" : ""
              }`}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${
                    selectedValue === "paypal" ? "bg-primary" : ""
                  }`}>
                  {selectedValue === "paypal" && (
                    <div className="w-1 h-1 border bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-black font-medium text-base">PayPal</span>
              </div>
              <Image
                src="/images/paypal_icon.png"
                alt="PayPal"
                width={80}
                height={80}
              />
            </Label>
          </div>
          {/* Stripe */}

          <div className="w-full flex rounded-md h-full">
            <input
              type="radio"
              id="stripe"
              value="stripe"
              checked={selectedValue === "stripe"}
              onChange={() => handleChange("stripe")}
              className={`hidden`}
            />
            <Label
              htmlFor="stripe"
              className={`cursor-pointer rounded-md relative flex items-center justify-between w-full  transition-colors h-12 p-4 ${
                selectedValue === "stripe" ? "border border-primary" : ""
              }`}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${
                    selectedValue === "stripe" ? "bg-primary" : ""
                  }`}>
                  {selectedValue === "stripe" && (
                    <div className="w-1 h-1 border bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-black font-medium text-base">Stripe</span>
              </div>
              <Image
                src="/images/stripe_icon.png"
                alt="PayPal"
                width={50}
                height={80}
              />
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Payment;

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { CircleMinus, CirclePlus } from "lucide-react";
import PriceWithTooltip from "./price-with-tooltip";
const BillingInfo = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Billing Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Product Pricing  */}

        <div className="w-full flex flex-col gap-3 mt-2">
          {/* Subtotal */}
          <PriceWithTooltip label="Subtotal" amount="$120.00" />

          {/* Shipping */}
          <PriceWithTooltip label="Shipping" amount="Free" />

          {/* Estimated taxes */}
          <PriceWithTooltip
            label="Estimated taxes"
            amount="$5.00"
            tooltipContent="The final tax and total will be confirmed by email or text after you place your order."
          />

          <hr />

          {/* Total */}
          <div className="flex items-center justify-between">
            <h2 className="text-black text-lg font-semibold text-right">
              Total
            </h2>
            <h3 className="text-black text-lg font-semibold text-right">
              $125.00
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingInfo;

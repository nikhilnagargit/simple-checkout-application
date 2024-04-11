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
import { z } from "zod";

import { UseFormReturn } from "react-hook-form";
import { Product } from "@/components/product-table";
import { Skeleton } from "@/components/ui/skeleton";

// helper component
function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

// main component
const ProductCard = ({
  form,
  product,
  loading,
}: {
  form: any;
  product?: Product;
  loading: boolean;
}) => {
  if (loading === true) {
    return <SkeletonCard />;
  }

  return (
    <Card className="shadow-md w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{product?.name}</CardTitle>
          <CardTitle>
            {form.watch("quantity")} x ${product?.price}
          </CardTitle>
        </div>
        <CardDescription>{product?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <Image
            src={product ? product.image : "/images/jordan.png"}
            alt="productImg"
            width={100}
            height={100}
            className="w-[350px] h-auto"
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className=" bg-slate-100 w-full rounded-full flex flex-row items-center justify-between py-3 px-5">
          <p>Quantity</p>
          <div className="flex flex-row items-center gap-3">
            <div className=" select-none">
              <CirclePlus
                onClick={() => {
                  // increasing the existing value of quantity
                  form.setValue("quantity", form.getValues("quantity") + 1);
                }}
                className="text-primary hover:bg-slate-200 rounded-full hover:scale-110"
                size={25}></CirclePlus>
            </div>
            <p className="bg-slate-100 font-bold">{form.watch("quantity")}</p>
            <div className=" select-none">
              <CircleMinus
                onClick={() => {
                  // increasing the existing value of quantity

                  const value = form.getValues("quantity");
                  if (value > 1) {
                    form.setValue("quantity", value - 1);
                  }
                }}
                className="text-destructive hover:bg-slate-200 rounded-full hover:scale-110"
                size={25}></CircleMinus>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

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
import { formSchema } from "../page";
import { UseFormReturn } from "react-hook-form";

const ProductCard = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Nike Airforce</CardTitle>
          <CardTitle>{form.watch("quantity")} x $345</CardTitle>
        </div>
        <CardDescription>
          Deploy your new project in one-click. Get the best of the class in no
          time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center p-4">
          <Image
            src="/images/jordan.png"
            alt="productImg"
            width={100}
            height={100}
            className="w-[200px] h-auto"
          />
        </div>
        <div className=" bg-slate-100 rounded-full flex flex-row items-center justify-between py-3 px-5">
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
      </CardContent>
    </Card>
  );
};

export default ProductCard;

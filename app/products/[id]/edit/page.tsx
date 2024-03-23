import React from "react";

import ProductForm, { ProductFormValues } from "@/components/product-form";
// This can come from database or API.
const defaultValues: Partial<ProductFormValues> = {
  name: "Laptop",
  description: "best laptop lorum inpsdifhj dfo sdokfnosdfo",
  category: "Electronics",
  type: "digital",
  weight: 340,
  price: 230,
  quantity: 430,
  image: "",
};

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
      </div>
      <ProductForm editMode={true} defaultValues={defaultValues} />
    </div>
  );
};

export default page;

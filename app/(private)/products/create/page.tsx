import React from "react";

import ProductForm, { ProductFormValues } from "@/components/product-form";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Create New Product
        </h2>
      </div>
      <ProductForm editMode={true} />
    </div>
  );
};

export default page;

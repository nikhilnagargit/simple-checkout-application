import React from "react";

import CheckoutLinkForm from "@/components/checkoutlink-form";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Checkout Link Generation
        </h2>
      </div>
      <CheckoutLinkForm editMode={true} productId={params.id} />
    </div>
  );
};

export default page;

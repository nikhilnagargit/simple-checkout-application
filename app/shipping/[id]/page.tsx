import React from "react";

import ShippingZoneForm from "@/components/shippingzone-form";

const page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Create New Shipping Zone
        </h2>
      </div>
      <ShippingZoneForm editMode={true} />
    </div>
  );
};

export default page;

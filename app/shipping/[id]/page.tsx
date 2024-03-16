import ShippingZoneForm from "@/components/shippingzone-form";

import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <ShippingZoneForm
        editMode={true}
        defaultValues={{
          name: "Asian Countries",
          countries: ["India", "Japan", "Russia"],

          shippingMethods: [
            {
              name: "DHL Express",
              ranges: [{ from: 100, to: 400, amount: 34 }],
            },
          ],
        }}
      />
    </>
  );
};

export default page;

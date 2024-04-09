import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex gap-1 my-4">
      <h3 className="mx-3 text-lg font-semibold">Simple Checkout</h3>
      <div className="relative w-6 h-6">
        <Image
          src={`/images/shoppingbag.png`}
          alt={"image"}
          fill
          sizes="20"
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};

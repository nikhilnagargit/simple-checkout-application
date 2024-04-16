import { BadgeCheck, Ban } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-4 md:max-w-md w-full items-center p-4 border-2 border-destructive">
        <h2>Order Failed.</h2>
        <Ban size={60}></Ban>
      </div>
    </div>
  );
};

export default Page;

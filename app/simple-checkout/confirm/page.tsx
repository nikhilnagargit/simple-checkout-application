import { BadgeCheck } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-4 md:max-w-md w-full items-center p-4 bg-primary text-white h-screen">
        <h2>Order Successfull</h2>
        <BadgeCheck size={60}></BadgeCheck>
      </div>
    </div>
  );
};

export default Page;

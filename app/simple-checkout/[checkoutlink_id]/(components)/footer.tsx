import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="max-w-md w-full flex items-center justify-center">
      <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-6 text-[#2683C2]">
        <Link href="/" className="underline">
          Terms
        </Link>
        <p>&copy; 2024 NN</p>
      </div>
    </div>
  );
};

export default Footer;

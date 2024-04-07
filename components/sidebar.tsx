"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Home,
  Landmark,
  Plane,
  Settings,
  Shirt,
  ShoppingCart,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarItems = [
  {
    label: "Dashboards",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Products",
    href: "/products",
    icon: Shirt,
  },
  {
    label: "Shipping",
    href: "/shipping",
    icon: Plane,
  },
  {
    label: "Checkout",
    href: "/checkout",
    icon: ShoppingCart,
  },
  {
    label: "Accounts",
    href: "/accounts",
    icon: Landmark,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
let count = 0;
function Sidebar() {
  const pathname = usePathname();
  console.log("sidebar rendered", count++);
  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-4 py-4">
        <div className="flex gap-1">
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

        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {sidebarItems.map((item, idx) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={
                    "/" + pathname.split("/")[1] === item.href
                      ? "secondary"
                      : "ghost"
                  }
                  className={
                    "/" + pathname.split("/")[1] === item.href
                      ? "gap-2 justify-start w-full text-primary"
                      : "gap-2 justify-start w-full"
                  }>
                  <item.icon size={20} />
                  {/* <span>{pathname.split("/")[1]}</span> */}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

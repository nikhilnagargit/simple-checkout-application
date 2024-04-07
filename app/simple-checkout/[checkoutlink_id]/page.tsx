import Link from "next/link";
import AddressFields from "./(components)/address-fields";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import PriceWithTooltip from "./(components)/price-with-tooltip";
import { Checkbox } from "@/components/ui/checkbox";

// FOOTER_LINKS
export const FOOTER_LINKS = [
  {
    key: 1,
    href: "",
    title: "Refund policy",
  },
  {
    key: 2,
    href: "",
    title: "Shipping policy",
  },
  {
    key: 3,
    href: "",
    title: "Terms of service",
  },
];
const page = ({ params }: { params: { checkoutlink_id: string } }) => {
  return (
    <div className="bg-white">
      <div className="flex items-start flex-col-reverse md:flex-row">
        {/* Left Col  */}
        <div className="bg-white w-full md:w-1/2 h-full flex justify-end">
          <div className="flex justify-between flex-col max-w-[1280px] w-full md:w-[80%]">
            {/* Top Content  */}
            <div className="w-full py-6 md:py-12 px-6 md:px-12 flex flex-col">
              {/* Contact  */}
              <div className="w-full flex flex-col gap-3 pt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-black">Contact</h2>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[#9D9D9D] text-sm font-medium">
                      Have an account?
                    </h3>
                    <Link
                      href="/"
                      className="text-[#2683C2] text-sm font-medium underline">
                      Log in
                    </Link>
                  </div>
                </div>
                <div className="flex items-start flex-col">
                  <Input
                    type="text"
                    placeholder="Email"
                    className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Checkbox id="email" />
                  <label
                    htmlFor="email"
                    className="text-black font-medium text-sm md:text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email me with news and offers
                  </label>
                </div>
              </div>

              {/* Address Fields  */}
              <AddressFields />
            </div>

            {/* Bottom Footer  */}
            <div className="border-t w-full">
              <div className="flex items-center justify-center md:justify-start gap-3 md:gap-4 py-6 px-6 text-[#2683C2]">
                {FOOTER_LINKS.map((data) => (
                  <Link href={data.href} key={data.key} className="underline">
                    {data.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col  */}
        <div className="bg-[#F5F5F5] block md:absolute right-0 w-full md:w-1/2 min-h-full">
          <div className="flex items-start justify-start max-w-[1280px] py-6 md:py-12 px-6 md:px-12 w-full md:w-[65%] gap-5 flex-col">
            {/* Product Info  */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex items-center justify-center bg-white border rounded-sm">
                  <Image
                    src="/jordan.png"
                    alt="productImg"
                    width={60}
                    height={10}
                    priority
                  />
                  <span className="absolute -top-2 -right-2 bg-[#666666] text-white font-medium text-sm rounded-full w-6 h-6 flex items-center justify-center">
                    1
                  </span>
                </div>
                <div>
                  <h2 className="text-black text-md font-medium">
                    Air Jordan 1 Mid SE Craftn
                  </h2>
                  <h3 className="text-[#666] text-sm font-normal">
                    Green / Size: 7
                  </h3>
                </div>
              </div>
              <div>
                <h2 className="text-[#666] text-sm font-normal text-right line-through">
                  $250.00
                </h2>
                <h3 className="text-black text-md font-medium text-right">
                  $120.00
                </h3>
              </div>
            </div>

            {/* Product Pricing  */}
            <>
              <div className="w-full flex flex-col gap-3 mt-2">
                {/* Subtotal */}
                <PriceWithTooltip label="Subtotal" amount="$120.00" />

                {/* Shipping */}
                <PriceWithTooltip label="Shipping" amount="Free" />

                {/* Estimated taxes */}
                <PriceWithTooltip
                  label="Estimated taxes"
                  amount="$5.00"
                  tooltipContent="The final tax and total will be confirmed by email or text after you place your order."
                />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <h2 className="text-black text-lg font-semibold text-right">
                    Total
                  </h2>
                  <h3 className="text-black text-lg font-semibold text-right">
                    $125.00
                  </h3>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

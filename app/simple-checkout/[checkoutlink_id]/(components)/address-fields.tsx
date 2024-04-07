"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import Payment from "./payment";

const formSchema = z.object({
  fName: z.string().min(1, {
    message: "First Name is required",
  }),
  lName: z.string().min(1, {
    message: "Last Name is required",
  }),
  company: z.string().optional(),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  province: z.string().min(1, {
    message: "Province is required",
  }),
  postal: z.string().min(1, {
    message: "Postal is required",
  }),
  phone: z.string().min(1).max(10),
});

const AddressFields = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Country/Region  */}
          <div className="grid grid-cols-1 gap-3 pt-8 pb-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue
                  className="text-sm !text-[#9D9D9D] rounded-md border-[1.5px] border-[#EFEFEF]"
                  placeholder="Country/Region"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Italy</SelectItem>
                <SelectItem value="dark">India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* First Name and Last Name  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            <FormField
              control={form.control}
              name="fName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="First name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company and Address  */}
          <div className="grid grid-cols-1 gap-3 pb-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Company (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* City, Province and Postal Code  */}
          <div className="grid grid-cols-3 gap-3 pb-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="City"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Province"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postal"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Postal code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone  */}
          <div className="grid grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-sm rounded-md border-[1.5px] border-[#EFEFEF]"
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-3 py-8">
            <h2 className="text-lg font-bold text-black">Shipping method</h2>
            <div className="flex items-center justify-between p-4 bg-[#F2F7FF] border-[1.5px] border-[#2683C2] rounded-md h-16">
              <h3 className="text-black font-medium text-base">
                Flat Rate Shipping
              </h3>
              <h4 className="text-black font-medium text-base">Free</h4>
            </div>
          </div>

          {/* Payment  */}
          <Payment />

          {/* Pay Button  */}
          <Button
            type="submit"
            className="w-full bg-[#127CBE] hover:bg-[#0f5b8a] h-16 text-lg text-white font-semibold mb-0 md:!mb-8">
            Pay now
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddressFields;

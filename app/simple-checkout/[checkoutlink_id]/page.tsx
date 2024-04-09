"use client";

import { Header } from "./(components)/header";
import { Button } from "@/components/ui/button";
import AddressForm from "./(components)/address-form";
import BillingInfo from "./(components)/billing-info";
import ProductCard from "./(components)/product-card";
import Footer from "./(components)/footer";
import Payment from "./(components)/payment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";

export const formSchema = z.object({
  fName: z.string().min(1, {
    message: "First Name is required",
  }),
  lName: z.string().min(1, {
    message: "Last Name is required",
  }),

  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),

  postal: z.string().min(1, {
    message: "Postal is required",
  }),
  phone: z.string().min(4).max(15),
  email: z.string().email(),
  quantity: z.number().positive(),
});

const page = ({ params }: { params: { checkoutlink_id: string } }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fName: "",
      lName: "",

      address: "",
      city: "",
      postal: "",
      phone: "",
      email: "",
      quantity: 2,
    },
    mode: "onSubmit",
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-4 md:max-w-md w-full items-center p-4">
        <Header />
        {/* product card migth cause slowneess because it rendered image again and again when form rerenderes. */}
        <ProductCard form={form} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <AddressForm form={form} />
            {/* Payment  */}
            <Payment />
            <BillingInfo />
            <Button type="submit" size={"sm"} className="w-full">
              Checkout
            </Button>
          </form>
        </Form>
        <Footer />
      </div>
    </div>
  );
};

export default page;

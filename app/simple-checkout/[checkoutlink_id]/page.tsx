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
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Product } from "@/components/product-table";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page({ params: { checkoutlink_id } }: any) {
  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const checkoutFormSchema = z.object({
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
    paymentMethod: z.string(),
  });

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fName: "Nikhil",
      lName: "Nagar",
      address: "Sample test",
      city: "Test",
      postal: "322323",
      phone: "+91393939393",
      email: "abcd@gmail.com",
      quantity: 2,
    },
    mode: "onSubmit",
  });

  const supabase = createClient();
  // side effects
  useEffect(() => {
    // function declaration only
    async function fetchCheckoutLinkDetails() {
      setLoading(true);
      let { data: checkoutlinks, error } = await supabase
        .from("checkout_links")
        .select("*")
        .eq("id", checkoutlink_id);

      if (error) {
        toast({
          title: "Error Occured.",
          description: (
            <p className="text-destructive">
              {error.message + " " + error.code}
            </p>
          ),
        });
        return;
      }
      // if no errrs then fetch product and shippingzone details
      if (checkoutlinks && checkoutlinks[0].length !== 0) {
        const product_id = checkoutlinks[0].product_id;
        const user_id = checkoutlinks[0].user_id;
        const shippingZone_id = checkoutlinks[0].shippingzone_id;
        const shippingmethod_name = checkoutlinks[0].shippingmethod_name;
        const quantity = checkoutlinks[0].quantity;

        // set the quantity
        form.setValue("quantity", quantity);
        // fetch product details
        let { data: products, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", product_id);

        if (error) {
          toast({
            title: "Error Occured.",
            description: (
              <p className="text-destructive">
                {error.message + " " + error.code}
              </p>
            ),
          });
          return;
        }

        if (products) {
          setProduct(products[0]);
        }
      }
      setLoading(false);
    }
    // call the function
    fetchCheckoutLinkDetails();
  }, []);

  // handle the submisison of checkout form and redirect to stripe chekcout page
  const onSubmit = async (values: z.infer<typeof checkoutFormSchema>) => {
    try {
      const response = await axios.post("/api/stripe/checkout", {
        ...values,
        product: product,
      });
      console.log(response);
      router.replace(response.data.redirect_url);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col gap-4 md:max-w-md w-full items-center p-4">
        <Header />
        {/* product card migth cause slowneess because it rendered image again and again when form rerenderes. */}
        <ProductCard form={form} product={product} loading={loading} />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (err) => {
              console.log(err);
            })}
            className="flex flex-col gap-4">
            <AddressForm form={form} />
            {/* Payment  */}
            <Payment form={form} />
            <BillingInfo form={form} product={product} loading={loading} />
            <Button type="submit" size={"sm"} className="w-full">
              Checkout
            </Button>
          </form>
        </Form>
        <Footer />
      </div>
    </div>
  );
}

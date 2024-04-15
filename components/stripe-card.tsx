"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { toast, useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";

const StripeCard = () => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<undefined | any>(
    undefined
  );

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchExisitngStripeAccount() {
      const session = await supabase.auth.getSession();
      if (!session) {
        console.log("auth error.");
      }

      let { data: payment_methods, error } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("user_id", session.data.session?.user.id);

      if (error) {
        toast({
          title: "Error !",
          description: (
            <p className="text-destructive">
              {error.message + " " + error.code}
            </p>
          ),
        });
      }
      if (payment_methods && payment_methods?.length == 1) {
        setPaymentMethod(payment_methods[0]);
      }
    }
    // function call
    fetchExisitngStripeAccount();
  }, []);

  async function handleCompleteOnboarding() {
    const session = await supabase.auth.getSession();
    try {
      const response = await axios.post("/api/stripe/connect", {
        user_id: session.data.session?.user.id,
      });

      router.replace(response.data.redirect_url);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleStripeConnect() {
    setLoading(true);
    const session = await supabase.auth.getSession();
    if (!session) {
      console.log("error getting the session.");
      return;
    }
    try {
      const response = await axios.post("/api/stripe/connect", {
        user_id: session.data.session?.user.id,
      });
      setLoading(false);
      router.replace(response.data.redirect_url);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Create new stripe account or connect with exisitng account.
        </CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-5 w-5 text-muted-foreground">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        {paymentMethod ? (
          <div className="flex gap-4 items-center mt-4">
            <p>
              Your stripe account -
              <Badge variant={"secondary"}>
                {paymentMethod?.stripe_account_id}
              </Badge>
            </p>
            {paymentMethod.stripe_onboarded ? (
              <Button variant={"destructive"} size={"sm"}>
                Delete
              </Button>
            ) : (
              <Button onClick={handleCompleteOnboarding}>
                Complete Onboarding
              </Button>
            )}
          </div>
        ) : (
          <Button size={"sm"} onClick={handleStripeConnect}>
            Connect with Stripe
            {loading && (
              <LoaderCircle
                size={15}
                className="animate-spin mx-2"></LoaderCircle>
            )}
          </Button>
        )}
        <div></div>
      </CardContent>
    </Card>
  );
};

export default StripeCard;

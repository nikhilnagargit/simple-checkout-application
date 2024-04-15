import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StripeCard from "@/components/stripe-card";

export default function page() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Payment Accounts</h2>
      </div>
      <Tabs defaultValue="stripe" className="space-y-4">
        <TabsList className="h-auto bg-white">
          <TabsTrigger value="stripe">
            <div className="w-[300px] flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mb-3 h-6 w-6">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Stripe
            </div>
          </TabsTrigger>
          <TabsTrigger value="paypal">
            <div className="w-[300px] flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              <Icons.paypal className="mb-3 h-6 w-6" />
              Paypal
            </div>
          </TabsTrigger>

          <TabsTrigger value="apple">
            <div className="w-[300px] flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground">
              <Icons.apple className="mb-3 h-6 w-6" />
              Apple
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="stripe" className="space-y-4">
          <StripeCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

{
  /* <CardHeader>
    <CardTitle>Receive payments in your Accounts</CardTitle>
    <CardDescription>
      Add payment methods to your simple-checkout links.
    </CardDescription>
  </CardHeader>
  <CardContent className="grid gap-6">
    <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
      <div>
        <RadioGroupItem value="card" id="card" className="peer sr-only" />
        <Label
          htmlFor="card"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="mb-3 h-6 w-6">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
          Stripe
        </Label>
      </div>
      <div>
        <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
        <Label
          htmlFor="paypal"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
          <Icons.paypal className="mb-3 h-6 w-6" />
          Paypal
        </Label>
      </div>
      <div>
        <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
        <Label
          htmlFor="apple"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
          <Icons.apple className="mb-3 h-6 w-6" />
          Apple
        </Label>
      </div>
    </RadioGroup>
    <div className="grid gap-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="First Last" />
    </div>
  </CardContent>
  <CardFooter>
    <Button variant={"default"}>Continue</Button>
  </CardFooter>
</Card>; */
}

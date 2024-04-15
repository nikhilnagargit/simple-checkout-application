import Stripe from "stripe";
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { error } from "console";


// create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:NextRequest,res:NextResponse) {
    
    const data = await req.json();
    console.log(data);
    // const supabase = createClient();
// in the webhook , you can add logic to decrease the proudct inventory, when someone doest the payment
   
try{
let checkout_session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: "usd",
            //   convert dollors in cent
              unit_amount: data.product.price*100,
              product_data: {
                name: data.product.name,
              },
            },
            quantity: data.quantity,
          },
        //   below line item is for shipping cost
          {
            price_data: {
              currency: "usd",
            //   shipping cost
              unit_amount: 10000,
              product_data: {
                name: "Shipping cost",
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:  process.env.NEXT_PUBLIC_HOST_PREFIX!+"ordersuccess",
        cancel_url: process.env.NEXT_PUBLIC_HOST_PREFIX!+"orderfailed",
      });
      return NextResponse.json(
        {redirect_url:checkout_session?.url}
  
      );

    }
    catch(err){
        console.log(err);
     return NextResponse.json(
            {redirect_url:"error",error:err}
      
          );
    }


  
  }




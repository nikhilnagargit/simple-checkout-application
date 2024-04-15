import Stripe from "stripe";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function POST(request: NextRequest) {

  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  const supabase = createClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return new Response(`Webhook Error: ${err}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case "account.updated":
    {

        console.log("-------------account updated--------")
 

        // find the account in the database by stripe_account_id
        let { data: payment_methods, error } = await supabase
        .from('payment_methods')
        .select()
        .eq("stripe_account_id",event.account)

        if(error){
            console.log(error);
            break;
        }

        // as above account exists, now if the webhook event has onboarded status as true, we can update the onboarding status in db
    
        const db_response1 = await supabase
        .from('payment_methods')
        .update( {"stripe_onboarded": event.data.object.payouts_enabled})
        .eq('stripe_account_id', event.account)
        .select()


        if(db_response1.error){
            console.log(error);
            break;
        }
    }
    break;
     
  
    default:
      console.log(`Unhandled event type ${event.type}`);

      
  }


  return new Response("RESPONSE EXECUTE", {
    status: 200,
  });
}
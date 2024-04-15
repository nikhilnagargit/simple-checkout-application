import Stripe from "stripe";
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { error } from "console";


// create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)


export async function POST(req:NextRequest,res:NextResponse) {

   const supabase = createClient();
   const session = await supabase.auth.getSession();
  //  check if already stripe  account is created or not for this user. 
  const response1 = await supabase
  .from('payment_methods')
  .select()
  .eq('user_id',session.data.session?.user.id);

   let account_id = null;


    if(response1.data && response1.data.length===0){

        // create new account id for this user.
        const account = await stripe.accounts.create({
          type: 'standard',
        });
        account_id = account.id;


        // send the stripe account id in DB
        const  {data,error} = await supabase
        .from('payment_methods')
        .insert(
          { "stripe_account_id": account_id },
        )
        .select()


        if(error){
          return NextResponse.json({"status":"failed",error:error})
        }

      }
      //  if data exisits already , then it means onboading is not completed.
    else if(response1.data){
          account_id = response1.data[0].stripe_account_id;
      }
    
    // get the account onboarding link from stripe.
    const return_url = process.env.NEXT_PUBLIC_HOST_PREFIX!+"accounts";


    const accountLink = await stripe.accountLinks.create({
      account: account_id,
      refresh_url: return_url,
      return_url: return_url,
      type: 'account_onboarding',

    });
  
  // return the account link
    return NextResponse.json(
      {redirect_url:accountLink.url}

    );
  }




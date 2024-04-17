import Stripe from "stripe";
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from "@/utils/supabase/server";


// create stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)




// accept post request.
export async function POST(req:NextRequest,res:NextResponse) {
    
    const data = await req.json();
      // console.log(data);
    const supabase = createClient();


    // fetch the exisiting quantity of product in stock from DB, and check if ordered quantity is in stock
    const fetch_quantity_response = await supabase 
    .from("products")
    .select()
    .eq("id",data.product.id);


    if(fetch_quantity_response.error){
      console.log(fetch_quantity_response.error);
      return NextResponse.json(
        {redirect_url:process.env.NEXT_PUBLIC_HOST_PREFIX+"simple-checkout/failed"}

      );
    }

    const current_quantity_in_DB = fetch_quantity_response.data[0].quantity;

    // if the item is in stock then only generate checkout session, otherwise redirect to error page
    if(current_quantity_in_DB-data.quantity < 0 ){
      return NextResponse.json(
        {redirect_url:process.env.NEXT_PUBLIC_HOST_PREFIX+"simple-checkout/failed"}

      );
    }


  try{

      // get the stripe account id from db for this user.
      
    let { data: payment_methods, error } = await supabase
    .from('payment_methods')
    .select()
    .eq("user_id",data.product.user_id);

    if(error){
      console.log(error);
    }
    // redirec to error page if payment method doest not exists.
    if(!payment_methods){
      console.log("stripe account payment method does not exists for this user.");
      return NextResponse.json(
        {redirect_url:process.env.NEXT_PUBLIC_HOST_PREFIX+"simple-checkout/failed"}
      );

    }

       let stripe_account_id = payment_methods[0].stripe_account_id;

      // save the data in orders table - order will be in pending state by default
        
      const order_insert_response = await supabase
      .from('orders')
      .insert([
        { 
        first_name: data.fName,
        last_name: data.lName,
        address:data.address,
        city:data.city,
        postal:data.postal,
        phone:data.phone,
        email:data.email,
        quantity:data.quantity,
        payment_method:data.paymentMethod,
        product_id:data.product.id,
        user_id:data.product.user_id,
      }
      ])
      .select();
  
  
  
      // handle error if order creation gets failed.
      if(order_insert_response.error){
        console.log(order_insert_response.error);
        return NextResponse.json(
          {redirect_url:process.env.NEXT_PUBLIC_HOST_PREFIX+"simple-checkout/failed"}
  
        );
      }
  

      // generate the checkout session on stripe.
      let checkout_session = await stripe.checkout.sessions.create({
        
              line_items: [
                {
                  price_data: {
                    currency: "usd",
                  //   convert dollors in cent
                    unit_amount: data.product.price*100,
                    product_data: {
                      name: data.product.name,
                      images:[data.product.image]
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
                  }
                ,quantity:1
                },
              ],
              mode: "payment",
              metadata:{
                order_id:order_insert_response.data[0].id
              },
            
            client_reference_id:order_insert_response.data[0].id,

            success_url:  process.env.NEXT_PUBLIC_HOST_PREFIX!+"simple-checkout/confirm",
            
            cancel_url: process.env.NEXT_PUBLIC_HOST_PREFIX!+"simple-checkout/failed",
            

            }
          ,
          {
            stripeAccount: stripe_account_id,
          }
          );

          console.log(checkout_session);

            return NextResponse.json(
              {redirect_url:checkout_session?.url}
        
            );

          }

    catch(err){
        console.log(err);
        return NextResponse.json(
            {redirect_url:process.env.NEXT_PUBLIC_HOST_PREFIX+"simple-checkout/failed"}
      
          );
  }


  
}




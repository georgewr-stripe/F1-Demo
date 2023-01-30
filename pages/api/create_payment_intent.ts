// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getCookie } from "cookies-next";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const {name, email, price, currency, freq} =  req.body;

  const customer = await stripe.customers.create({ name, email,});
  const priceObj = await stripe.prices.retrieve(price, {expand: ['currency_options']})
  const amount = priceObj.currency_options ? priceObj.currency_options[currency.toLowerCase()].unit_amount : 0

  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    metadata: {
      product: 'F1 TV Pro',
      fan_id: '123',
      subscription_freq:freq, 
      price: price
    },
    setup_future_usage: 'off_session',
    amount: amount || 0,
    currency: currency.toLowerCase(),
    automatic_payment_methods: {enabled: true}
  });
  
  res.send({client_secret: paymentIntent.client_secret, customer: customer.id})
}

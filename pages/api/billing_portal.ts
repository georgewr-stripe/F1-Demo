// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const {customer, return_url} =  req.body;
  const session = await stripe.billingPortal.sessions.create({
    customer,
    return_url,
  });

  
  res.send({url: session.url})
}

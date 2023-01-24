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
  const { price, currency, payment_method, customer } = req.body;

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      currency: currency.toLowerCase(),
      default_payment_method: payment_method,
      items: [
        {
          price,
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscription_id: subscription.id,
    });
  } catch (error: any) {
    return res.status(400).send({ error: { message: error.message } });
  }
}

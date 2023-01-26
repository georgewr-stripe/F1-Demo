// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponseWithSocket, paymentEvent } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  res.send(await getLatestPayments());
}

const getLatestPayments = async (): Promise<paymentEvent[]> => {
  const payments = await stripe.paymentIntents.list();
  return payments.data.map((pi) => {
    return {
      id: pi.id,
      amount: pi.amount,
      currency: pi.currency,
      status: pi.status,
      created: pi.created,
      payment_error: !!pi.last_payment_error,
    };
  });
};

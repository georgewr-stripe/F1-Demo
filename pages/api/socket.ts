// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiResponseWithSocket, paymentEvent } from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1543747",
  key: "129700f9ec517f2e7601",
  secret: "5aabf0962d9287e8de8e",
  cluster: "eu",
  useTLS: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (req.body) {
    const evt = parseWebhook(req);
    if (evt) {
      pusher.trigger("f1-demo", "event", evt);
    }
  }

  res.send({});
}

const parseWebhook = (req: NextApiRequest): paymentEvent | null => {
  const { type } = req.body;
  if (typeof type == "string") {
    if (type.includes("payment_intent")) {
      const { id, created, amount, currency, status, last_payment_error } =
        req.body.data.object;
      return {
        id,
        created,
        amount,
        currency,
        status,
        payment_error: !!last_payment_error,
      };
    }
  }
  return null;
};

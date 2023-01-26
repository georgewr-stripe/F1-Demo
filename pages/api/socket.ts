// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ClientToServerEvents,
  InterServerEvents,
  NextApiResponseWithSocket,
  paymentEvent,
  ServerToClientEvents,
  SocketData,
} from "@/lib/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import Stripe from "stripe";
import { idText } from "typescript";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    // send some data

    if (req.body) {
      const evt = parseWebhook(req);
      if (evt) {
        res.socket.server.io.emit("event", evt);
      }
    }
  } else {
    console.log("Socket is initializing");

    const io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(res.socket.server);

    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("connected");
      socket.on("getEvents", async () => {
        console.log("getting initial events");
        io.emit("initialEvents", await getLatestPayments());
      });
    });
  }
  res.end();
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

import type { Server as HTTPServer } from "http";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Socket as NetSocket } from "net";
import type { Server as IOServer } from "socket.io";

export interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

export interface checkoutDataType {
  customer?: string;
  price?: string;
  amount?: number;
  freq: "monthly" | "annual";
  currency: string;
  client_secret?: string;
}

export type CheckoutDataType = React.Dispatch<
  React.SetStateAction<checkoutDataType>
>;

export interface paymentEvent {
  id: string;
  amount: number;
  currency: string;
  created: number;
  status: string;
  payment_error: boolean

}

export interface paymentEvents {
  [id: string]: {
    amount: number;
    currency: string;
    created: number;
    status: string;
    payment_error: boolean
  };
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  event: (data: paymentEvent) => void;
  initialEvents: (data: paymentEvent[]) => void;
}

export interface ClientToServerEvents {
  getEvents: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  [key: string]: string;
}

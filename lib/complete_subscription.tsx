import React from "react";
import Spinner from "./spinner";
import { CheckoutDataType, checkoutDataType } from "./types";
import Image from "next/image";
import hamilton from "../public/hamilton.png";

interface Props {
  checkoutData: checkoutDataType;
  setCheckoutData: CheckoutDataType;
  payment_method: any;
}

const CompleteSubscription = ({
  checkoutData,
  setCheckoutData,
  payment_method,
}: Props) => {
  console.log(payment_method);

  const billingPortal = async () => {
    const req = await fetch('/api/billing_portal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customer: payment_method.customer, return_url: window.location.origin})
    })
    const {url} = await req.json()
    window.location.href = url;
  }

  return (
    <div className="bg-transparent z-50">
      <div className="pt-12 sm:pb-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-50/0 via-gray-100/80 to-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl text-f1-dark font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Welcome to F1
            </h2>
            <p className="mt-4 text-xl text-f1-dark "></p>
          </div>
        </div>
      </div>
      <div className=" bg-f1-red pb-16 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-lg overflow-hidden rounded-lg shadow-lg lg:flex lg:max-w-none">
              <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl sm:tracking-tight">
                  Payment Confirmation
                </h3>
                <div className="mt-2"></div>
                <div className="mt-2">
                  <div className="rounded-md shadow">
                    <button
                    onClick={billingPortal}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-f1-dark px-5 py-3 text-base font-medium text-white hover:bg-f1-red"
                    >
                      Configure Subscription
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 bg-white pr-4 text-base font-semibold text-f1-dark">
                      {"Policies"}
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <p className="text-sm mt-2">
                    By clicking on register, I agree that I have read and agree
                    to the Terms and Conditions and Privacy Policy
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 pt-8  text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center">
                <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-gray-900">
                  <Image
                    src={hamilton}
                    alt="hamilton"
                    className="mx-auto w-auto h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteSubscription;

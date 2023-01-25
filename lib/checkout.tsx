import React from "react";
import Spinner from "./spinner";
import { CheckoutDataType, checkoutDataType } from "./types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK || "");

interface Props {
  checkoutData: checkoutDataType;
  setCheckoutData: CheckoutDataType;
}

const Checkout = ({ checkoutData, setCheckoutData }: Props) => {

  const formatter = React.useMemo(
    () =>
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: checkoutData.currency,
      }),
    [checkoutData]
  );

  if (!checkoutData.client_secret) {
    return <></>
  }

  const options = { clientSecret: checkoutData.client_secret };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="bg-transparent pb-16">
        <div className="pt-12 sm:pb-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-50/0 via-gray-100/80 to-gray-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl text-f1-dark font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Checkout
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
                    Payment Details
                  </h3>
                  <div className="mt-2">
                    <CheckoutForm />
                  </div>
                  <div className="mt-2">
                    
                  </div>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 bg-white pr-4 text-base font-semibold text-f1-dark">
                        {"Policies"}
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <p className="text-sm mt-2">
                      By purchasing, I agree that I have read and
                      agree to the Terms and Conditions and Privacy Policy
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg font-medium leading-6 text-gray-900">
                    Watch F1 your way
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl font-bold tracking-tight text-gray-900">
                    <span>
                      {checkoutData.amount
                        ? formatter.format(checkoutData.amount / 100)
                        : ""}
                    </span>
                    <span className="ml-3 text-xl font-medium tracking-normal text-gray-500">
                      {checkoutData.currency}
                    </span>
                  </div>
                  <p className="pt-2">
                    {checkoutData.freq == 'monthly' ? '/MONTH' : '/YEAR'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Checkout;

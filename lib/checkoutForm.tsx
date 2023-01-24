import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React from "react";
import Spinner from "./spinner";

const CheckoutForm = () => {
  const [loading, setLoading] = React.useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.origin + '/?section=complete_subscription',
      },
    });

    if (typeof error.message == "string") {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      debugger
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement  />
      <div className="mt-6">
        <div className="rounded-md shadow">
          <button
            disabled={!stripe}
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-f1-dark px-5 py-3 text-base font-medium text-white hover:bg-f1-red"
          >
            Pay Now
            {loading ? <Spinner /> : ""}
          </button>
        </div>
        {errorMessage && <div className="text-f1-red">{errorMessage}</div>}
      </div>
    </form>
  );
};

export default CheckoutForm;

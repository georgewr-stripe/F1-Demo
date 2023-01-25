import { Switch } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";
import Stripe from "stripe";
import { CheckoutDataType, checkoutDataType } from "./types";

const includedFeatures = [
  "Live stream every track session for all GPs",
  "Access all driver onboard cameras & team radios",
  "Live stream F1, F2, F3 and Porsche Supercup",
  "650+ historic races from the F1 archives",
  "Full access to all live timing features",
  "Full Race replays and highlights",
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  prices: {
    monthly: Stripe.Response<Stripe.Price>;
    annual: Stripe.Response<Stripe.Price>;
  };
  setSection: (section: string) => void;
  checkoutData: checkoutDataType;
  setCheckoutData: CheckoutDataType;
}

const currencyCountryMap = {
  MXN: ["Mexico"],
  EUR: ["France", "Germany"],
  GBP: ["United Kingdom"],
  USD: ["United States"],
  BRL: ["Brazil"],
};

export default function PricingTable({
  prices,
  setSection,
  checkoutData,
  setCheckoutData,
}: Props) {
  if (!prices.monthly.currency_options || !prices.annual.currency_options) {
    throw "No Currencies";
  }
  const currencies = Object.keys(prices.monthly.currency_options);

  const pricesByCurrency = Object.fromEntries(
    currencies.map((cur) => {
      return [
        cur.toUpperCase(),
        {
          monthly:
            (prices.monthly.currency_options &&
              prices.monthly.currency_options[cur].unit_amount) ||
            0,
          annual:
            (prices.annual.currency_options &&
              prices.annual.currency_options[cur].unit_amount) ||
            0,
        },
      ];
    })
  );
  console.log(pricesByCurrency);

  const [annual, setAnnual] = React.useState<boolean>(false);
  const freq = annual ? "annual" : "monthly";

  React.useEffect(() => {
    setCheckoutData((oldData) => ({
      ...oldData,
      price: prices[freq].id,
      amount: pricesByCurrency[oldData.currency][freq],
      freq
    }));
  }, [freq]);

  const handleCurrencyChange = (currency: string) => {
    setCheckoutData((oldData) => ({
      ...oldData,
      currency,
      amount: pricesByCurrency[currency][freq],
    }));
  };

  const formatter = React.useMemo(
    () => 
      new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: checkoutData.currency,
      }),
      [checkoutData]
  );

  const handleSubmit = () => {
    setSection("register");
  };

  return (
    <div className="bg-transparent pb-16 ">
      <div className="pt-12  sm:pb-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-50/0 via-gray-100/80 to-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl text-f1-dark font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Follow live data on your own F1 pit wall
            </h2>
            <p className="mt-4 text-xl text-f1-dark ">
              Know more with F1 live timing data and watch race highlights and
              our huge archives.
            </p>
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
                  F1 TV Pro
                </h3>
                <p className="mt-6 text-base text-gray-500">
                  Watch all the F1 sessions (free practices, qualifying and the
                  race) live or on-demand on your computer, smartphone, tablet.
                  Live streaming of F2, F3, Porsche Supercup is now available
                </p>
                <div className="mt-8">
                  <div className="flex items-center">
                    <h4 className="flex-shrink-0 bg-white pr-4 text-base font-semibold text-f1-dark">
                      {"What's included"}
                    </h4>
                    <div className="flex-1 border-t-2 border-gray-200" />
                  </div>
                  <ul
                    role="list"
                    className="mt-8 space-y-5 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0"
                  >
                    {includedFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start lg:col-span-1"
                      >
                        <div className="flex-shrink-0">
                          <CheckCircleIcon
                            className="h-5 w-5 text-f1-red"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 pb-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="GBP"
                    onChange={(e) => handleCurrencyChange(e.target.value)}
                  >
                    {Object.entries(currencyCountryMap).map(
                      ([cur, countries]: [string, string[]]) => {
                        return countries.map((country) => {
                          return (
                            <option key={country} value={cur}>
                              {country}
                            </option>
                          );
                        });
                      }
                    )}
                  </select>
                </div>
                <p className="text-lg font-medium leading-6 text-gray-900">
                  Watch F1 your way
                </p>
                <div className="flex flex-row justify-around pt-3">
                  <p className={annual ? "" : "font-bold"}>Monthly</p>
                  <Switch
                    checked={annual}
                    onChange={setAnnual}
                    className={classNames(
                      "bg-f1-red",
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-f1-red focus:ring-offset-2"
                    )}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        annual ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      )}
                    />
                  </Switch>
                  <p className={annual ? "font-bold" : ""}>Annual</p>
                </div>
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
                <p className="mt-4 text-sm">
                  <a href="#" className="font-medium text-f1-dark underline">
                    Learn about our membership policy
                  </a>
                </p>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <div
                      onClick={handleSubmit}
                      className="flex items-center justify-center rounded-md border border-transparent bg-f1-dark px-5 py-3 text-base font-medium text-white hover:bg-f1-red"
                    >
                      Get Access
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

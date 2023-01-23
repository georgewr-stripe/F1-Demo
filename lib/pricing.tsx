import { Switch } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const includedFeatures = [
  "Live stream every track session for all GPs",
  "Access all driver onboard cameras & team radios",
  "Live stream F1, F2, F3 and Porsche Supercup",
  "650+ historic races from the F1 archives",
  "Full access to all live timing features",
  "Full Race replays and highlights",
];

const formatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingTable() {
  const [annual, setAnnual] = React.useState<boolean>(false);
  const [price, setPrice] = React.useState<number>(2.29);

  React.useEffect(() => {
    setPrice(annual ? 19.99 : 2.29);
  }, [annual]);

  return (
    <div className="bg-transparent z-50">
      <div className="pt-12 sm:pb-12 sm:pt-16 lg:pt-20 bg-gradient-to-b from-gray-100/0 to-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Follow live data on your own F1 pit wall
            </h2>
            <p className="mt-4 text-xl text-gray-600">
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
                      What's included
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
              <div className="bg-gray-50 py-8 px-6 text-center lg:flex lg:flex-shrink-0 lg:flex-col lg:justify-center lg:p-12">
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
                  <span>{formatter.format(price)}</span>
                  <span className="ml-3 text-xl font-medium tracking-normal text-gray-500">
                    GBP
                  </span>
                </div>
                <p className="mt-4 text-sm">
                  <a href="#" className="font-medium text-f1-dark underline">
                    Learn about our membership policy
                  </a>
                </p>
                <div className="mt-6">
                  <div className="rounded-md shadow">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-f1-dark px-5 py-3 text-base font-medium text-white hover:bg-gray-900"
                    >
                      Get Access
                    </a>
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

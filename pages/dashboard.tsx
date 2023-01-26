import usePersistedState from "@/lib/persistantState";
import {
  ClientToServerEvents,
  paymentEvent,
  paymentEvents,
  ServerToClientEvents,
} from "@/lib/types";
import moment from "moment";
import React from "react";
import pusherJs from "pusher-js";

var pusher = new pusherJs("129700f9ec517f2e7601", {
    cluster: "eu",
  });

const Dashboard = () => {
  const [events, setEvents] = usePersistedState<paymentEvents>("wh_events", {});

  var channel = pusher.subscribe("f1-demo");

  const totals = React.useMemo(() => {
    const eventData = Object.values(events);
    const currencies = [...new Set(eventData.map((e) => e.currency))];
    return Object.fromEntries(
      currencies.map((c) => {
        return [
          c,
          eventData
            .filter((e) => e.currency == c)
            .map((e) => e.amount)
            .reduce((partialSum, a) => partialSum + a, 0),
        ];
      })
    );
  }, [events]);

  React.useEffect(() => {
    fetch("/api/get_payments").then((resp) =>
      resp.json().then((data) => {
        setEvents(
          Object.fromEntries(
            data.map((e: paymentEvent) => {
              const { id, ...data } = e;
              return [id, data];
            })
          )
        );
      })
    );
  }, []);

  channel.bind("event", function (ev: paymentEvent) {
    const { id, ...data } = ev;
    setEvents((prevEvents) => ({ ...prevEvents, [id]: data }));
  });

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency,
    }).format(amount / 100);
  };

  const getStatusBadge = (ev: any) => {
    const status =
      ev.status == "succeeded"
        ? "Succeeded"
        : ev.status == "requires_payment_method" && !ev.payment_error
        ? "Pending"
        : "Failed";
    const colours = {
      Succeeded: "green",
      Pending: "amber",
      Failed: "f1-red",
    };
    const dot = {
      Succeeded: "text-green-600",
      Pending: "text-amber-600 animate-ping",
      Failed: "text-red-600",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full bg-${colours[status]} px-3 py-0.5 text-sm font-medium text-f1-dark`}
      >
        <svg
          className={`-ml-1 mr-1.5 h-2 w-2 ${dot[status]}`}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        {status}
      </span>
    );
  };

  return (
    <div className="">
      <div className="mx-auto px-6">
        <dl
          className={`mt-5 flex flex-row justify-evenly overflow-hidden rounded-lg bg-f1-dark shadow `}
        >
          {Object.entries(totals).map(([currency, amount], i) => (
            <div key={i} className="px-4 py-5 sm:p-6 ">
              <dt className="text-base font-normal text-white">
                {currency.toUpperCase()}
              </dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-f1-red">
                  {formatPrice(amount, currency)}
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center"></div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-f1-dark">
                    <tr>
                      <th
                        scope="col"
                        className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                      >
                        Payment ID
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Currency
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Object.entries(events)
                      .sort(([id, e], [id2, e2]) => e.created - e2.created)
                      .map(([id, e]) => (
                        <tr key={id}>
                          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                            {id}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                            {e.currency.toUpperCase()}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                            {formatPrice(e.amount, e.currency)}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {getStatusBadge(e)}
                          </td>
                          <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                            {moment.unix(e.created).fromNow()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

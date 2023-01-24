import PricingTable from "@/lib/pricing";
import Stripe from "stripe";
import React from "react";
import Register from "@/lib/register";
import { useRouter } from "next/router";
import SectionTransition from "@/lib/transition";
import { checkoutDataType } from "@/lib/types";
import Footer from "@/lib/footer";
import Checkout from "@/lib/checkout";
import { GetServerSideProps } from "next";
import CompleteSubscription from "@/lib/complete_subscription";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

interface Props {
  prices: {
    monthly: Stripe.Response<Stripe.Price>;
    annual: Stripe.Response<Stripe.Price>;
  };
  subscription?: string;
}

export default function Home({ prices, subscription }: Props) {
  const router = useRouter();

  const sections = {
    pricing: { component: PricingTable, props: { prices } },
    register: { component: Register, props: {} },
    checkout: { component: Checkout, props: {} },
    complete_subscription: {
      component: CompleteSubscription,
      props: { subscription },
    },
  };
  const [section, setSection] = React.useState<[string, any]>(["pricing", {}]);

  React.useEffect(() => {
    if (router.query.section) {
      if (
        router.query.section !== section[0] &&
        typeof router.query.section == "string"
      ) {
        if (Object.keys(sections).includes(router.query.section)) {
          setSection([router.query.section, {}]);
        }
      }
    }
  }, [section, router.query, router.asPath]);

  const handleSectionChange = (
    sectionName: keyof typeof sections,
    props: any
  ) => {
    router.push("/?section=" + sectionName, undefined, { shallow: true });
    setSection([sectionName, props]);
  };

  const [checkoutData, setCheckoutData] = React.useState<checkoutDataType>({
    customer: "",
    price: prices.monthly.id,
    amount: prices.monthly.unit_amount || 0,
    currency: "GBP",
    freq: "monthly",
    client_secret: "",
    subscription,
  });

  React.useEffect(() => {
    console.log(checkoutData);
  }, [checkoutData]);

  const sectionContent = React.useMemo(() => {
    return Object.entries(sections).map(([key, Section]) => {
      return (
        <SectionTransition
          key={key}
          show={section[0] == key}
          className="absolute w-full"
        >
          <Section.component
            setSection={handleSectionChange}
            {...{
              ...Section.props,
              ...section[1],
              checkoutData,
              setCheckoutData,
            }}
          />
        </SectionTransition>
      );
    });
  }, [section, checkoutData]);

  return (
    <div className=" w-screen flex-1 flex-grow-0 min-h-[50%] bg-cover bg-no-repeat bg-top bg-[url(/verstappen.jpeg)] flex flex-col">
      <div className="pt-20 z-30">{sectionContent}</div>
      <div className="w-full h-[50%] bg-f1-dark fixed  bottom-0  bg-gradient-to-b from-f1-red to-f1-dark z-0">
        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const monthly = await stripe.prices.retrieve(
    process.env.MONTHLY_PRICE_ID || "",
    { expand: ["currency_options"] }
  );
  const annual = await stripe.prices.retrieve(
    process.env.ANNUAL_PRICE_ID || "",
    { expand: ["currency_options"] }
  );

  let subscription = null;

  if (
    typeof context.query.payment_intent == "string" &&
    context.query.redirect_status == "succeeded" &&
    context.query.section == "complete_subscription"
  ) {
    const pi = await stripe.paymentIntents.retrieve(
      context.query.payment_intent,
      { expand: ["payment_method", "latest_charge"] }
    );
    if (
      typeof pi.customer == "string" &&
      typeof pi.payment_method != "string" &&
      pi.payment_method
    ) {
      let pm: any = pi.payment_method.id;
      if (
        pi.payment_method.type == "ideal" &&
        typeof pi.latest_charge != "string"
      ) {
        console.log(pi.latest_charge?.payment_method_details);
        pm =
          pi.latest_charge?.payment_method_details?.ideal?.generated_sepa_debit;
      }
      if (
        pi.payment_method.type == "bancontact" &&
        typeof pi.latest_charge != "string"
      ) {
        console.log(pi.latest_charge?.payment_method_details);
        pm =
          pi.latest_charge?.payment_method_details?.bancontact
            ?.generated_sepa_debit;
      }

      const sub = await stripe.subscriptions.create({
        customer: pi.customer,
        currency: pi.currency,
        description: "F1 TV Pro",
        default_payment_method: pm,
        items: [
          {
            price: pi.metadata.price,
          },
        ],
        payment_behavior: "allow_incomplete",
        collection_method: "charge_automatically",
      });
      subscription = sub.id;
    }
  }

  return {
    props: { prices: { monthly, annual }, subscription },
  };
};

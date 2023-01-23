
import PricingTable from "@/lib/pricing";
import Stripe from "stripe";
import React from "react";
import Register from "@/lib/register";
import { useRouter } from "next/router";

const stripe = new Stripe(process.env.STRIPE_SK || "", {
  apiVersion: "2022-11-15",
});

interface Props {
  prices: {
    monthly: Stripe.Response<Stripe.Price>;
    annual: Stripe.Response<Stripe.Price>;
  };
}

export default function Home({ prices }: Props) {
  const router = useRouter();

  const sections = {
    pricing: { component: PricingTable, props: { prices } },
    register: { component: Register, props: {} },
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
  }, [section, router.query]);

  const handleSectionChange = (
    sectionName: keyof typeof sections,
    props: any
  ) => {
    router.push("/?section=" + sectionName, undefined, { shallow: true });
    setSection([sectionName, props]);
  };

  const sectionContent = React.useMemo(() => {
    return Object.entries(sections).map(([key, Section]) => {
      return (
        <Section.component
          key={key}
          show={section[0] == key}
          setSection={handleSectionChange}
          {...Section.props}
          {...section[1]}
        />
      );
    });
  }, [section]);

  console.log(prices);
  return (
    <div className=" w-full h-[1200px] bg-contain bg-no-repeat bg-top bg-[url(/verstappen.jpeg)] flex flex-col justify-center">
      <div className="absolute w-full">{sectionContent}</div>
      
    </div>
  );
}

export async function getServerSideProps() {
  const monthly = await stripe.prices.retrieve(
    process.env.MONTHLY_PRICE_ID || "",
    { expand: ["currency_options"] }
  );
  const annual = await stripe.prices.retrieve(
    process.env.ANNUAL_PRICE_ID || "",
    { expand: ["currency_options"] }
  );

  return {
    props: { prices: { monthly, annual } }, // will be passed to the page component as props
  };
}

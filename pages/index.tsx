import Head from "next/head";
import Image from "next/image";
import PricingTable from "@/lib/pricing";

export default function Home() {
  return (
    <div className=" w-full h-[1200px] bg-contain bg-no-repeat bg-top bg-[url(/verstappen.jpeg)] flex flex-col justify-center">
      <PricingTable />
    </div>
  );
}

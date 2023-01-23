import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ToolbarSection from "lib/toolbar";
import Head from "next/head";
import localFont from "@next/font/local";

const f1Fonts = localFont({
  src: [
    {
      path: "../fonts/Formula1-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Formula1-Bold.otf",
      weight: "900",
      style: "bold",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>F1 Subscripion</title>
        <meta
          name="description"
          content="Follow live data on your own F1 pit wall"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bg-white h-full ` + f1Fonts.className}>
        <div className="relative overflow-hidden">
          <ToolbarSection />
          <main className="h-screen" >
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </>
  );
}

import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import Head from "next/head";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Head>
          <title>Spotify Clone</title>
        </Head>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

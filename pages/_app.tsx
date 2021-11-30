import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;

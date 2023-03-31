import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import * as React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
        <ChakraProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ChakraProvider>
    </RecoilRoot>
  );
}

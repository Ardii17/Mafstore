import { ThemeProvider } from "@/components/elements/contextAPI";
import { AppShell } from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Mafstore</title>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

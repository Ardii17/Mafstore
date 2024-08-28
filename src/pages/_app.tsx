import Toaster from "@/components/elements/Toaster";
import { ThemeProvider } from "@/components/elements/contextAPI";
import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Mafstore</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <SessionProvider session={session}>
        <MantineProvider>
          <ThemeProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
          </ThemeProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

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

import Toaster from "@/components/elements/Toaster";
import { ThemeProvider } from "@/components/elements/contextAPI";
import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    const handleToaster = () => {
      if (Object.keys(toaster).length > 0) {
        setTimeout(() => {
          setToaster({});
        }, 5000);
      }
    };

    handleToaster();
  }, [toaster]);

  return (
    <>
      <Head>
        <title>Mafstore</title>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="./../Icons/icon-web.png" type="image/x-icon" />
      </Head>
      <SessionProvider session={session}>
        <MantineProvider>
          <ThemeProvider>
            <AppShell>
              <Component {...pageProps} setToaster={setToaster} />
            </AppShell>
          </ThemeProvider>
        </MantineProvider>
      </SessionProvider>
      {Object.keys(toaster).length > 0 && (
        <Toaster
          variant={`${toaster.variant}`}
          message={`${toaster.message}`}
          onClose={() => setToaster({})}
        />
      )}
    </>
  );
}

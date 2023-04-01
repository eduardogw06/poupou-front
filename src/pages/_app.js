import Layout from "../components/common/Layout/Layout";
import LayoutNoAuth from "../components/common/Layout/LayoutNoAuth";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const pagesWithoutLayout = ["Home", "Login", "Register"];

  return pagesWithoutLayout.includes(Component.displayName) ? (
    <SessionProvider session={session}>
      <LayoutNoAuth>
        <Component {...pageProps} />
      </LayoutNoAuth>
    </SessionProvider>
  ) : (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

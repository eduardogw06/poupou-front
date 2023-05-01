import Layout from "../components/common/Layout/Layout";
import LayoutNoAuth from "../components/common/Layout/LayoutNoAuth";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const pagesWithoutLayout = ["Home", "Login", "Register"];

  return (
    <SessionProvider session={session}>
      {pagesWithoutLayout.includes(Component.displayName) ? (
        <LayoutNoAuth>
          <Component {...pageProps} />
        </LayoutNoAuth>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}

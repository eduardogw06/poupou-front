import Layout from "../components/common/Layout/Layout";
import LayoutNoAuth from "../components/common/Layout/LayoutNoAuth";

export default function App({ Component, pageProps }) {
  const pagesWithoutLayout = ["Home", "Login", "Register"];

  return pagesWithoutLayout.includes(Component.displayName) ? (
    <LayoutNoAuth>
      <Component {...pageProps} />
    </LayoutNoAuth>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

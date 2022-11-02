import Layout from "../components/common/Layout/Layout";
import LayoutNoAuth from "../components/common/Layout/LayoutNoAuth";

export default function App({ Component, pageProps }) {
  console.log(Component.name);

  const pagesWithoutLayout = ["Home", "Login", "Register"];
  return pagesWithoutLayout.includes(Component.name) ? (
    <LayoutNoAuth>
      <Component {...pageProps} />
    </LayoutNoAuth>
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

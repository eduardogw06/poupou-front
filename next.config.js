const routes = require("./routes");

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXTAUTH_URL: 'https://www.sistemapoupou.com.br/api/auth',
  },
  async rewrites() {
    return [...routes];
  },
};

const routes = require("./routes");

module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [...routes];
  },
};

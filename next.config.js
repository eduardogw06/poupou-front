const routes = require("./routes");

module.exports = {
  async rewrites() {
    return [...routes];
  },
};

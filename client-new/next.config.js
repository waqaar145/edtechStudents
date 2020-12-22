const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const withImages = require('next-images')

module.exports = {
  env: {
    customKey: "my-value",
  },
};

module.exports = withImages({
  webpack(config, options) {
    return config
  }
})

const withCSS = require("@zeit/next-css");
module.exports = withCSS({});

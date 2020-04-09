const merge = require("lodash/merge")

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV !== "production",
    basename: process.env.PUBLIC_URL,
    isBrowser: typeof window !== "undefined"
  },
  test: {},
  development: {
    apiUrl: process.env.VIMC_URL
  },
  production: {
    apiUrl: process.env.VIMC_URL
  }
}

module.exports = merge(config.all, config[config.all.env])

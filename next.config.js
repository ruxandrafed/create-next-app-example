const withCss = require('@zeit/next-css')

if (typeof require !== "undefined") {
  require.extensions[".less"] = () => {};
  require.extensions[".css"] = (file) => {};
}

const APP_PREFIX = '/example'

module.exports = withCss({
  assetPrefix: APP_PREFIX,
  publicRuntimeConfig: {
    pathPrefix: APP_PREFIX
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }

    return config
  }
})

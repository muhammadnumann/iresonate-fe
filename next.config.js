// const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
// const withLess = require("@zeit/next-less")
// const withCss = require("@zeit/next-css");
// const lessToJS = require("less-vars-to-js")
// const fs = require("fs")
// const path = require("path")

// // Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//    fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
// )

// module.exports = withCss({
//    cssModules:true,
//    ...withLess({
//    devIndicators: {
//       autoPrerender: false,
//    },
//    trailingSlash: false,
//    env: {
//       REACT_APP_BASE_URL: "https://gify-api.dev.webelight.co.in/graphql",
//       REACT_APP_BASE_URL_ADMIN: "https://gify-api.dev.webelight.co.in/graphql/admin",
//       stripe: 'pk_test_51HXL8bAD0cQvFG4ZKSqgUQmi8ekEv5CGvWKuNNrxhQVwfsRW73cERCssDklcKoDsMkQMeJRwm5MuaMl57aHK90Ob00Ivv3jSQG ',
//    },
//    lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables, // make your antd custom effective
//    },
//    webpack5: false,
//    webpack: (config, { isServer }) => {
//       if (isServer) {
//          const antStyles = /antd\/.*?\/style.*?/
//          const origExternals = [...config.externals]
//          config.externals = [
//             (context, request, callback) => {
//                if (request.match(antStyles)) return callback()
//                if (typeof origExternals[0] === "function") {
//                   origExternals[0](context, request, callback)
//                } else {
//                   callback()
//                }
//             },
//             ...(typeof origExternals[0] === "function" ? [] : origExternals),
//          ]

//          config.module.rules.unshift({
//             test: antStyles,
//             use: "null-loader",
//          })
//       }
//       return config
//    },
// })
// })






/* eslint-disable */
const withLess = require("@zeit/next-less")
const withCss = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js")
const fs = require("fs")
const path = require("path")

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
   fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf8")
)

module.exports = withCss({
   cssModules:true,
   ...withLess({
   devIndicators: {
      autoPrerender: false,
   },
   trailingSlash: false,
   env: {
      REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
      REACT_APP_BASE_URL_ADMIN: process.env.REACT_APP_BASE_URL_ADMIN,
      stripe: process.env.STRIPE_LOAD,
   },
   lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
   },
   eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
   webpack5: false,
   webpack: (config, { isServer }) => {
      if (isServer) {
         const antStyles = /antd\/.*?\/style.*?/
         const origExternals = [...config.externals]
         config.externals = [
            (context, request, callback) => {
               if (request.match(antStyles)) return callback()
               if (typeof origExternals[0] === "function") {
                  origExternals[0](context, request, callback)
               } else {
                  callback()
               }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
         ]

         config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
         })
      }
      return config
   },
})
})

// /* eslint-disable */
// const withLess = require('@zeit/next-less')
// const lessToJS = require('less-vars-to-js')
// const fs = require('fs')
// const path = require('path')

// // Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
// )

// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = (file) => {}
// }

// module.exports = withLess({
//   lessLoaderOptions: {
//     javascriptEnabled: true,
//     modifyVars: themeVariables, // make your antd custom effective
//   },
//   webpack5: false,
//   env: {
//     REACT_APP_BASE_URL: 'https://dev-gify.api.webelight.co.in/graphql',
//     REACT_APP_BASE_URL_ADMIN:
//       'https://dev-gify.api.webelight.co.in/graphql/admin',
//     stripe:
//       'pk_test_51HXL8bAD0cQvFG4ZKSqgUQmi8ekEv5CGvWKuNNrxhQVwfsRW73cERCssDklcKoDsMkQMeJRwm5MuaMl57aHK90Ob00Ivv3jSQG ',
//   },
// })

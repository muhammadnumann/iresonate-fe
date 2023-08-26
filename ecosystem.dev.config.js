module.exports = {
  apps: [
    {
      name: "iresonate-web",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "development",
        name: "iresonate-web",
        APP_LOG_LEVEL: "true",
        APP_HOST: "https://dev-gify-api.webelight.co.in",
        APP_PORT: "3030",
      },
    },
  ],
};

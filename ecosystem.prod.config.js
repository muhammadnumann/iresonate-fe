module.exports = {
  apps: [
    {
      name: "iresonate-web",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        name: "iresonate",
        APP_LOG_LEVEL: "true",
        APP_HOST: "https://apiresonate.virtual-node.com",
        APP_PORT: "3015",
      },
    },
  ],
};


module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@emotion/react"] = "@emotion/react";
      config.resolve.alias["@emotion/styled"] = "@emotion/styled";
    }
    return config;
  },
};

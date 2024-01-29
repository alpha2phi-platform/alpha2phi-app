const config = {
  apiGateway: {
    REGION: import.meta.env.VITE_REGION,
    PRIMARY_API_URL: import.meta.env.VITE_NODE_API_URL,
    SECONDARY_API_URL: import.meta.env.VITE_PYTHON_API_URL,
  },
  cognito: {
    REGION: import.meta.env.VITE_REGION,
    USER_POOL_ID: import.meta.env.VITE_USER_POOL_ID,
    APP_CLIENT_ID: import.meta.env.VITE_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: import.meta.env.VITE_IDENTITY_POOL_ID,
  },
};

export default config;

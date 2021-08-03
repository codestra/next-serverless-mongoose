/**
 * Get the environment
 */

const { MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, MONGODB_URI, NODE_ENV } = process.env;

export const initEnvironment = () => {
  if (!MONGODB_URI && (!MONGODB_HOST || !MONGODB_DATABASE_NAME || !MONGODB_USER || !MONGODB_PASS)) {
    throw new Error('Please define the MONGODB_URI or the other environment variable inside .env.local');
  }
};
initEnvironment();

export { MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, MONGODB_URI, NODE_ENV };

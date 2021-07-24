/**
 * Get the environment
 */

interface IEnvironment {
  MONGODB_HOST: string;
  MONGODB_DATABASE_NAME: string;
  MONGODB_USER: string;
  MONGODB_PASS: string;
  MONGODB_URI: string;
}

declare const process: {
  env: IEnvironment;
};

const { MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, MONGODB_URI } = process.env;

export { MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, MONGODB_URI };

if (!MONGODB_URI && (!MONGODB_HOST || !MONGODB_DATABASE_NAME || !MONGODB_USER || !MONGODB_PASS)) {
  throw new Error('Please define the MONGODB_URI or the other environment variable inside .env.local');
}

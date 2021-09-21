import mongoose from 'mongoose';
import { MONGODB_URI, MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, NODE_ENV } from './environment';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connected: undefined, promise: undefined } as any;
}

/**
 * Will look either for a MONGODB_URI or  MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER and MONGODB_PASS
 * to create a mongoose connection. If a connection has already been made, will return the cached connection.
 * @param  {mongoose.ConnectionOptions} options
 * @returns A mongoose connection
 */
const useMongoose = async (options?: mongoose.ConnectionOptions): Promise<typeof mongoose> => {
  try {
    if (cached.connected) {
      return cached.connected;
    }
    if (!cached.promise) {
      const uri = MONGODB_URI ? MONGODB_URI : `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE_NAME}`;

      const opts = {
        // auth
        ...(MONGODB_USER &&
          MONGODB_PASS && {
            auth: {
              user: MONGODB_USER,
              password: MONGODB_PASS,
            },
          }),
        /* istanbul ignore next */
        serverSelectionTimeoutMS: NODE_ENV === 'development' ? 3000 : 10000,
        ...options,
      };

      cached.promise = mongoose.connect(uri, opts).then((m) => m);
    }
    cached.connected = await cached.promise;
    return cached.connected;
  } catch (e: any) {
    return e;
  }
};

export default useMongoose;

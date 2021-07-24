import mongoose from 'mongoose';
import { MONGODB_URI, MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS } from './environment';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = { connected: undefined, promise: undefined } as any;
}

/**
 * Will look either for a MONGODB_URI or  MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER and MONGODB_PASS
 * to create a mongoose connection. If a connection has already been made, will return the cached connection.
 * @returns A mongoose connection
 */

async function useMongoose(): Promise<typeof mongoose> {
  if (cached.connected) {
    return cached.connected;
  }

  if (!cached.promise) {
    const uri = MONGODB_URI ? MONGODB_URI : `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE_NAME}`;

    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
      // auth
      ...(MONGODB_USER &&
        MONGODB_PASS && {
          auth: {
            user: MONGODB_USER,
            password: MONGODB_PASS,
          },
        }),
    };

    cached.promise = mongoose.connect(uri, opts).then((mongoose) => mongoose);
  }
  cached.connected = await cached.promise;
  return cached.connected;
}

export default useMongoose;

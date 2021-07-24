import mongoose from 'mongoose';
/**
 * Will look either for a MONGODB_URI or  MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER and MONGODB_PASS
 * to create a mongoose connection. If a connection has already been made, will return the cached connection.
 * @returns A mongoose connection
 */
declare function useMongoose(): Promise<typeof mongoose>;
export default useMongoose;

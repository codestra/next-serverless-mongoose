import mongoose from 'mongoose';

import { NextApiRequest, NextApiResponse } from 'next';
import useMongoose from './useMongoose';

export interface NextApiRequestWithMongoose extends NextApiRequest {
  mongoose: typeof mongoose;
}

export declare type NextApiHandlerWithMongoose<T = any> = (
  req: NextApiRequestWithMongoose,
  res: NextApiResponse<T>,
) => void | Promise<void>;

/**
 * Will look either for a MONGODB_URI or  MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER and MONGODB_PASS
 * to create a mongoose connection. If a connection has already been made, will return the cached connection.
 * This function is used to wrap the nextjs api handler and it will add req.mongoose for later use
 * @param handler nextjs api handler
 * @param {mongoose.ConnectionOptions} options
 * @returns {NextApiRequestWithMongoose}
 */

const withMongoose = (handler: NextApiHandlerWithMongoose, options?: mongoose.ConnectOptions) => {
  return async (req: NextApiRequestWithMongoose, res: NextApiResponse): Promise<void> => {
    const client = await useMongoose(options);

    (req as NextApiRequestWithMongoose).mongoose = client;
    return handler(req, res);
  };
};

export default withMongoose;

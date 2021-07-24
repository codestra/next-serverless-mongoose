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

function withMongoose(handler: NextApiHandlerWithMongoose) {
  return async (req: NextApiRequestWithMongoose, res: NextApiResponse): Promise<void> => {
    const client = await useMongoose();

    (req as NextApiRequestWithMongoose).mongoose = client;
    return handler(req, res);
  };
}

export default withMongoose;

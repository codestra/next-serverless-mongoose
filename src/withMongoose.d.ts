import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
export interface NextApiRequestWithMongoose extends NextApiRequest {
    mongoose: typeof mongoose;
}
export declare type NextApiHandlerWithMongoose<T = any> = (req: NextApiRequestWithMongoose, res: NextApiResponse<T>) => void | Promise<void>;
declare function withMongoose(handler: NextApiHandlerWithMongoose): (req: NextApiRequestWithMongoose, res: NextApiResponse) => Promise<void>;
export default withMongoose;

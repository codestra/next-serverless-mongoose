import mongooseType from 'mongoose';

// Augmentations for the global scope can only be directly nested
// in external modules or ambient module declarations.
export {};

export interface IEnvironment {
  MONGODB_HOST?: string;
  MONGODB_DATABASE_NAME?: string;
  MONGODB_USER?: string;
  MONGODB_PASS?: string;
  MONGODB_URI?: string;
  NODE_ENV?: string;
}

declare global {
  var mongoose: typeof mongooseType & { connected?: typeof mongooseType; promise?: Promise<typeof import('mongoose')> };

  namespace NodeJS {
    interface ProcessEnv extends IEnvironment {}
  }
}

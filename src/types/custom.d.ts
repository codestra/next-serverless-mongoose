import mongooseType from 'mongoose';

// Augmentations for the global scope can only be directly nested
// in external modules or ambient module declarations.
export {};

declare global {
  var mongoose: typeof mongooseType & { connected?: typeof mongooseType; promise?: Promise<typeof import('mongoose')> };
}

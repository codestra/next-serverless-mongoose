"use strict";
/**
 * Get the environment
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.MONGODB_PASS = exports.MONGODB_USER = exports.MONGODB_DATABASE_NAME = exports.MONGODB_HOST = void 0;
var _a = process.env, MONGODB_HOST = _a.MONGODB_HOST, MONGODB_DATABASE_NAME = _a.MONGODB_DATABASE_NAME, MONGODB_USER = _a.MONGODB_USER, MONGODB_PASS = _a.MONGODB_PASS, MONGODB_URI = _a.MONGODB_URI;
exports.MONGODB_HOST = MONGODB_HOST;
exports.MONGODB_DATABASE_NAME = MONGODB_DATABASE_NAME;
exports.MONGODB_USER = MONGODB_USER;
exports.MONGODB_PASS = MONGODB_PASS;
exports.MONGODB_URI = MONGODB_URI;
if (!MONGODB_URI && (!MONGODB_HOST || !MONGODB_DATABASE_NAME || !MONGODB_USER || !MONGODB_PASS)) {
    throw new Error('Please define the MONGODB_URI or the other environment variable inside .env.local');
}

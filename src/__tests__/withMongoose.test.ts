import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { NextApiRequestWithMongoose } from '../withMongoose';
import { NextApiResponse } from 'next';

describe('environment', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {});
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should have the mongoose connection in the returned request object', async () => {
    process.env = {
      MONGODB_URI: mongoServer.getUri(),
    };

    const withMongoose = require('../withMongoose').default;
    const handler = (req: NextApiRequestWithMongoose, res: NextApiResponse) => {
      expect(req.mongoose.connection.readyState).toBe(1);
      req.mongoose.connection.close();
    };
    await withMongoose(handler)({}, {});
  });
});

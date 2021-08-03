import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

describe('environment', () => {
  let con: MongoClient;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    con = await MongoClient.connect(mongoServer.getUri(), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  // afterEach(() => {
  //   global.mongoose = undefined as unknown as typeof mongoose;
  // });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  // it('should throw an error on connection timeout', async () => {
  //   process.env = {
  //     MONGODB_URI: 'mongodb://localhost',
  //   };

  //   try {
  //     var useMongoose = require('../useMongoose').default;
  //     const mongoConnection = await useMongoose({ serverSelectionTimeoutMS: 1 });
  //     mongoConnection.connection.close();
  //   } catch (e) {
  //     expect(e).toMatchSnapshot();
  //   }
  // });

  it('should create a document', async () => {
    process.env = {
      MONGODB_URI: mongoServer.getUri(),
    };

    const useMongoose = require('../useMongoose').default;
    const mongoConnection = (await useMongoose()) as typeof mongoose;
    const col = mongoConnection.connection.collection('test');
    const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
    expect(result.result).toMatchSnapshot();
    expect(await col.countDocuments({})).toBe(2);
    mongoConnection.connection.close();
  });

  it('should authenticate via user and password', async () => {
    // connect to mongo
    const mongoConnection = await mongoose.connect(mongoServer.getUri('admin'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // create the test user
    await mongoConnection.connection.db.command({
      createUser: 'test',
      pwd: 'test',
      roles: [
        { db: 'admin', role: 'dbAdminAnyDatabase' },
        { db: 'admin', role: 'readWriteAnyDatabase' },
        { db: 'admin', role: 'clusterAdmin' },
      ],
    });

    // check if it worked fine
    // await mongoConnection.connection.db.command({ usersInfo: 1 });

    process.env = {
      MONGODB_URI: mongoServer.getUri(),
      MONGODB_USER: 'test',
      MONGODB_PASS: 'test',
    };

    // connect with useMongoose
    const useMongoose = require('../useMongoose').default;
    const mongoConnectionAuth = (await useMongoose()) as typeof mongoose;

    // close the connections
    mongoConnection.connection.close();
    mongoConnectionAuth.connection.close();
  });

  it('should authenticate via user and password', async () => {
    // change the env
    process.env = {
      MONGODB_USER: 'test',
      MONGODB_PASS: 'test',
      MONGODB_HOST: mongoServer.getUri().split('://')[1].slice(0, -1),
      MONGODB_DATABASE_NAME: 'admin',
    };

    const useMongoose = require('../useMongoose').default;
    const mongoConnection = (await useMongoose()) as typeof mongoose;

    const useMongoose2 = require('../useMongoose').default;
    const mongoConnection2 = (await useMongoose2()) as typeof mongoose;

    // close the connections
    mongoConnection.connection.close();
    mongoConnection2.connection.close();
  });
});

describe('environment', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  it('should throw an error if neither the MONGODB_URI or the MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER and MONGODB_PASS have been set', async () => {
    try {
      var initEnvironment = require('../environment').initEnvironment;
      initEnvironment();
    } catch (e) {
      expect(e.message).toEqual('Please define the MONGODB_URI or the other environment variable inside .env.local');
    }
  });

  it('should throw an error if not all environment variables have been set', async () => {
    process.env = {
      MONGODB_HOST: 'test',
      // MONGODB_DATABASE_NAME: '',
      MONGODB_USER: 'test',
      MONGODB_PASS: 'test',
    };

    try {
      var initEnvironment = require('../environment').initEnvironment;
      initEnvironment();
    } catch (e) {
      expect(e.message).toEqual('Please define the MONGODB_URI or the other environment variable inside .env.local');
    }
  });

  it('should not throw an error if any of the required environments have been set', async () => {
    process.env = {
      MONGODB_HOST: 'test',
      MONGODB_DATABASE_NAME: 'test',
      MONGODB_USER: 'test',
      MONGODB_PASS: 'test',
    };

    var initEnvironment = require('../environment').initEnvironment;
    var { MONGODB_HOST, MONGODB_DATABASE_NAME, MONGODB_USER, MONGODB_PASS, MONGODB_URI } = require('../environment');
    initEnvironment();

    expect(MONGODB_HOST).toEqual('test');
    expect(MONGODB_DATABASE_NAME).toEqual('test');
    expect(MONGODB_USER).toEqual('test');
    expect(MONGODB_PASS).toEqual('test');
    expect(MONGODB_URI).toEqual(undefined);
  });
});

# next-serverless-mongoose

next-serverless-mongoose is a package that provides helper functions to easily connect with a mongodb. This package was mainly build for usage with nextjs-api-routes and mongoose.

## Installation

Use [npm](https://nodejs.org/en/download/) for installation:

```bash
npm install @codestra/next-serverless-mongoose
```

Or use [yarn](https://yarnpkg.com/) for installation:

```bash
yarn add @codestra/next-serverless-mongoose
```

## Usage

This package provides currently two functions to deal with a mongodb connection.
Both these function assume that you have set one of the two following alternatives in your `.env.local` file:

```bash
MONGODB_URI=example-uri.com
```

Or the following:

```bash
MONGODB_HOST=example-host
MONGODB_DATABASE_NAME=example-database-name
```

If one of these two alternatives have been set, the following functions will automagically make sure that you have a running mongodb-connection and you will be able to do your operations.

For the authentication, you can set the following:

```bash
MONGODB_USER=example-user
MONGODB_PASS=example-password
```

### useMongoose

The `useMongoose` function has to be called before any other mongoose operation in the api-route. It will automatically connect to the mongodb with the provided details from the environment.

Example:

```javascript
import { NextApiRequest, NextApiResponse } from 'next';
import { useMongoose } from '@codestra/next-serverless-mongoose';
import User from '../../models/User';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mongoose = await useMongoose();
  console.log(mongoose.connection.readyState);
  // returns 1: connected

  await User.create({
    name: 'Name',
  });

  res.status(200).json({ message: 'created user' });
};

export default handler;
```

### withMongoose

The `withMongoose` function acts as a wrapper around the `handle` function of the api-route. It also makes sure that you have a running mongodb-connection based on the environment variables. This function will alter the `request` from `nextjs` and add a `mongoose` field.
At this point you will be able to call any other mongoose function as long as you have wrapped the `handler` with it.

Example:

```javascript
import { NextApiResponse } from 'next';
import { withMongoose, NextApiRequestWithMongoose } from '@codestra/next-serverless-mongoose';
import User from '../../models/User';

const handler = async (req: NextApiRequestWithMongoose, res: NextApiResponse) => {
  console.log(req.mongoose.connection.readyState);
  // returns 1: connected

  await User.create({
    name: 'Name',
  });

  res.status(200).json({ message: 'created user' });
};

export default withMongoose(handler);
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits and Inspiration

- [nextjs with-mongoose example](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)
- [nextjs middleware](https://hoangvvo.com/blog/nextjs-middleware)

## License

[MIT](https://choosealicense.com/licenses/mit/)

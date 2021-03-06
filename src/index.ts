import express from 'express';
import config from './assets/config.json';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './route/index';
import { handleGraphQLErrorFn } from './midlewares/error.middleware';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './shema/schema';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { SubscriptionConnectionParams } from './core/types';
import { checkAuth } from './midlewares/check-auth';

env.config();

const PORT = process.env.PORT || 5000;

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const server = new ApolloServer({
      schema,
      formatError: handleGraphQLErrorFn,
      context: (context) => context,
      plugins: [
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer.close();
              },
            };
          },
        },
      ],
    });

    const app: express.Application = express();
    const httpServer = createServer(app);

    const subscriptionServer = SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe,
        onConnect({ authorization }: SubscriptionConnectionParams) {
          const user = checkAuth(authorization);
          return user;
        },
      },
      {
        server: httpServer,
        path: '/subscription',
      }
    );

    await server.start();

    app.use(
      cors({
        credentials: true,
        origin: config.clientUrl,
      })
    );

    app.use(express.json());
    app.use(cookieParser());
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    app.use('/api', router);

    server.applyMiddleware({
      app,
      path: '/graphql',
      cors: {
        credentials: true,
        origin: config.clientUrl,
      },
    });
    httpServer.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

start();

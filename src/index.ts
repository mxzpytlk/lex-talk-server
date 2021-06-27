import express from 'express';
import config from './assets/config.json';
import env from 'dotenv';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { queryGraphQl as schema } from './shema/schema';
import cookieParser from 'cookie-parser';
import router from './route/index';
import { handleError, handleGraphQLErrorFn } from './midlewares/error.middleware';

env.config();

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

app.use(cors({
  credentials: true,
  origin: config.clientUrl
}));
app.use(express.json());
app.use(cookieParser());

app.use('/graphql', (req, res) => {
  return graphqlHTTP({
    schema,
    context: { req, res },
    graphiql: true,
    customFormatErrorFn: handleGraphQLErrorFn(res),
  })(req, res)
});

app.use('/api', router);
app.use(handleError);
import { checkAuth } from './midlewares/auth.middleware';

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App started on port ${PORT}`));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

start();

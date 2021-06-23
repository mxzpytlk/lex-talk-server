import express from 'express';
import config from './assets/config.json';
import env from 'dotenv';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { queryGraphQl as schema } from './shema/schema';
import cookieParser from 'cookie-parser';
import router from './route/index';

env.config();

const PORT = process.env.PORT || 5000;

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
  })
);

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

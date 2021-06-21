import express from 'express';
import config from './assets/config.json';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { queryGraphQl as schema } from './schema/graphql-shema/schema';

const PORT = process.env.PORT || 3000;

const app: express.Application = express();

app.use(cors());

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

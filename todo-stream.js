const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

const redis = require("redis").createClient();
const { promisify } = require("util");
const { join } = require('path');
redis.on("error", function (error) {
  console.error(error);
});

// redis API
const XADD = promisify(redis.XADD).bind(redis);

// register Dapr subscriptions
app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    'get-todo',
    'create-todo',
    'update-todo',
    'delete-todo',
    'delete-all-todo']
    .map(sub => ({
      pubsubname: "pubsub",
      topic: sub,
      route: '/xadd'
    })));
});


const stream_name = 'todo_stream';

app.post('/xadd', async (req, res) => {
  try {
    const { event, data } = req.body.data;
    const id = await XADD(stream_name, '*', event, JSON.stringify(data))
    console.log({ id, event, data });
    res.status(200).send({ id, event, data });
  } catch (ex) {
    res.status(500).send(ex.toString());
  }
});

const port = 3003;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));

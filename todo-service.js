const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

const redis = require("redis");
const client = redis.createClient();
client.on("error", function (error) {
  console.error(error);
});

const { publish } = require('./dapr');
app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "get-all-todo",
      route: "get-all-todo"
    },
    {
      pubsubname: "pubsub",
      topic: "create-todo",
      route: "create-todo"
    },
    {
      pubsubname: "pubsub",
      topic: "update-todo",
      route: "update-todo"
    },
    {
      pubsubname: "pubsub",
      topic: "delete-todo",
      route: "delete-todo"
    },
    {
      pubsubname: "pubsub",
      topic: "delete-all-todo",
      route: "delete-all-todo"
    }
  ]);
});

app.post('/get-all-todo', async (req, res) => {
  // try {
  //   const { event, data, wsid } = req.body.data;
  //   const { key } = data;
  //   const state = await getState(key);
  //   res.status(200).send(state);
  //   publish('ws', { event, key, data: state, wsid });
  // } catch (ex) {
  //   res.status(500).send(ex.toString);
  // }
});

app.post('/create-todo', async (req, res) => {
});

app.post('/update-todo', async (req, res) => {
});

app.post('/delete-todo', async (req, res) => {
});

app.post('/delete-all-todo', async (req, res) => {
});

// app.post('/save-state', async (req, res) => {
//   try {
//     const { event, data, wsid } = req.body.data;
//     const { key, value } = data;
//     const state = await saveState(key, value);
//     res.status(200).send(state);
//     publish('ws', { event, key, data: state, wsid });
//   } catch (ex) {
//     res.status(500).send(ex.toString);
//   }
// });

const port = 3002;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
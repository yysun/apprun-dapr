const { publish, saveState, getState } = require('./dapr');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "get-state",
      route: "get-state"
    },
    {
      pubsubname: "pubsub",
      topic: "save-state",
      route: "save-state"
    }
  ]);
});

app.post('/get-state', async (req, res) => {
  try {
    const { event, data, wsid } = req.body.data;
    const { key } = data;
    const state = await getState(key);
    res.status(200).send(state);
    publish('ws', { event, key, data: state, wsid });
  } catch (ex) {
    res.status(500).send(ex.toString());
  }
});

app.post('/save-state', async (req, res) => {
  try {
    const { event, data, wsid } = req.body.data;
    const { key, value } = data;
    const state = await saveState(key, value);
    res.status(200).send(state);
    publish('ws', { event, key, data: state, wsid });
  } catch (ex) {
    res.status(500).send(ex.toString());
  }
});

const port = 3001;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
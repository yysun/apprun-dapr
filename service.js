const { publish } = require('./dapr');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "add",
      route: "add"
    },
  ]);
});

app.post('/add', (req, res) => {
  try {
    // console.log('Received by "/add": ', req.headers['content-type'], req.body);
    const { event, data } = req.body.data;
    const [num1, num2] = data;
    const value = num1 + num2
    res.status(200).send(value.toString());
    publish('ws', {event, data: value, wsid: '*'});
  } catch (ex) {
    res.status(500).send(ex.toString);
  }
});

const port = 3000;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
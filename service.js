const express = require('express');
const request = require('request');

const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 3000;
const pubsubName = 'pubsub';

const publish = (topic, json) => {
  console.log("Publishing: ", topic, json);
  const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
  request({ uri: publishUrl, method: 'POST', json });
};

app.post('/add', (req, res) => {
  try {
    console.log('Received by "/add": ', req.headers['content-type'], req.body);
    const { event, data, wsid } = req.body.data;
    const [num1, num2] = data;
    const value = num1 + num2
    res.status(200).send(value.toString());
    publish('ws', {event, data: value, wsid});
  } catch (ex) {
    res.status(500).send(ex.toString);
  }
});

app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
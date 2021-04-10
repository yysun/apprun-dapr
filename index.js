const express = require('express');
const request = require('request');
const webSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const clients = {};

const app = express();
app.use(express.json());
app.use(express.static('.'))

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 8080;
const pubsubName = 'pubsub';

const publish = (topic, json) => {
  console.log("Publishing: ", topic, json);
  const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
  request({ uri: publishUrl, method: 'POST', json });
};

app.post('/ws', (req, res) => {
  const { id, topic, data } = req.body;
  clients[id].send(JSON.stringify({ topic, data }));
  res.sendStatus(200);
});

const server = app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));

const wss = new webSocket.Server({ server });
wss.on('connection', function (ws, req) {
  const id = uuidv4();
  clients[id] = ws;

  ws.on('message', function (msg) {
    try {
      const json = JSON.parse(msg);
      console.log('==>', json);
      publish(json.event, { data: json.data, id });
      //ws.send(JSON.stringify(json));
    } catch (e) {
      ws.send(e.toString());
      console.error(e);
    }
  });

  ws.on('close', function () {
    console.log('closing ws connection');
  });

  console.log('started ws connection');
});
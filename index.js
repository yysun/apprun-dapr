const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const webSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const clients = {};

const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

app.use(express.static('public'))

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 8000;
const pubsubName = 'pubsub';

const publish = (topic, json) => {
  console.log("Publishing: ", topic, json);
  const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
  request({ uri: publishUrl, method: 'POST', json });
};

app.post('/ws', (req, res) => {
  const { wsid, event, data } = req.body.data;
  clients[wsid]?.send(JSON.stringify({
    event, data
  }));
  res.sendStatus(200);
});

const server = app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));

const wss = new webSocket.Server({ server });
wss.on('connection', function (ws, req) {
  const wsid = uuidv4();
  clients[wsid] = ws;

  ws.on('message', function (msg) {
    try {
      const json = JSON.parse(msg);
      console.log('==>', json);
      const { event, data } = json;

      // option 1: reply directly
      // ws.send(JSON.stringify({
      //   event,
      //   data: data[0] + data[1]
      // }));


      // option 2: call service
      // const serviceUrl = `${daprUrl}/invoke/service/method/${event}`;
      // post_data = { data: json };
      // fetch(serviceUrl, {
      //   method: 'post',
      //   body: JSON.stringify(post_data),
      //   headers: { 'Content-Type': 'application/json' },
      // })
      //   .then(res => res.json())
      //   .then(json =>
      //     ws.send(JSON.stringify({
      //     event,
      //     data: json
      //   })));


      // option 3: publish event
      publish(json.event, { ...json, wsid });

    } catch (e) {
      ws.send(e.toString());
      console.error(e);
    }
  });

  ws.on('close', function () {
    console.log('closing ws connection');
    delete clients[wsid];
  });

  console.log('started ws connection');
});
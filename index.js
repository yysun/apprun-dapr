const { publish } = require('./dapr');
const zipkin = require('./zipkin');
const express = require('express');
const webSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const clients = {};

const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));
app.use(express.static('public'))

app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "ws",
      route: "ws"
    },
  ]);
});

const send = (id, json) => {
  if (id && clients[id]) {
    clients[id].send(json);
    zipkin(json.event, 'webserver', 'frontend', id);
  }
};

app.post('/ws', (req, res) => {
  const { wsid, event, data } = req.body.data;
  const json = JSON.stringify({ event, data});
  if (wsid === '*') {
    for (let id in clients) send(id, json);
  }
  else send(wsid, json);
  res.sendStatus(200);
});

const port = 8000;
const server = app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));

const wss = new webSocket.Server({ server });
wss.on('connection', function (ws, req) {
  const wsid = uuidv4();
  clients[wsid] = ws;

  ws.on('message', function (msg) {
    try {
      const json = JSON.parse(msg);
      publish(json.event, { ...json, wsid });
      zipkin(json.event, 'frontend', 'webserver', wsid);
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
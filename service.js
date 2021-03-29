const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 3000;
const pubsubName = 'pubsub';

// const publish = (topic, json) => {
//   console.log("Publishing: ", topic, json);
//   const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
//   request({ uri: publishUrl, method: 'POST', json });
// };

app.post('/add', (req, res) => {
  try {
    console.log(req.body);
    // console.log('Received by "add": ', req.headers['content-type']);
    // typeof req.body.data, req.body.data);
    // const data = req.body.data;
    // const json = typeof data === 'string' ? JSON.parse(data) : data;
    // const [num1, num2] = json.data;
    // const result = { data: num1 + num2, id: json.id };
    // // publish('added', result);
    // res.status(200).send(JSON.stringify(result));
    res.sendStatus(200);
  } catch (ex) {
    res.status(500).send(ex.toString);
  }
});

app.get('/dapr/subscribe', (req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "add",
      route: "add"
    }
  ]);
});

app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
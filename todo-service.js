const { publish } = require('./dapr');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

const redis = require("redis").createClient();
const { promisify } = require("util");
redis.on("error", function (error) {
  console.error(error);
});

// redis API
const INCR = promisify(redis.INCR).bind(redis);
const HMSET = promisify(redis.HMSET).bind(redis);
const HMGET = promisify(redis.HMGET).bind(redis);
const HKEYS = promisify(redis.HKEYS).bind(redis);
const HDEL = promisify(redis.HDEL).bind(redis);
const DEL = promisify(redis.DEL).bind(redis);

// register Dapr subscriptions
app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    'get-all-todo',
    'get-todo',
    'create-todo',
    'update-todo',
    'delete-todo',
    'delete-all-todo']
    .map(sub => ({
      pubsubname: "pubsub",
      topic: sub,
      route: sub
    })));
});

const run = async (req, res, fn) => {
  try {
    const { event, data, wsid } = req.body.data;
    const result = await fn(data);
    res.status(200).send(result);
    publish('ws', { event, data: result, wsid });
  } catch (ex) {
    res.status(500).send(ex.toString());
  }
}

const todo_hash = 'todos';
const todos_id_max = 'todos:id';
const todo_id_prefix = 'todo';

const get_todo = async (id) => {
  const json = await HMGET(todo_hash, id);
  return json[0] ? JSON.parse(json) : {};
}

app.post('/get-all-todo', async (req, res) => {
  try {
    const { event, wsid } = req.body.data;
    const ids = await HKEYS(todo_hash);
    const todos = await Promise.all(ids.map(id => get_todo(id)));
    res.status(200).send(todos);
    publish('ws', { event, data: todos, wsid });
  } catch (ex) {
    res.status(500).send(ex.toString());
  }
});

app.post('/create-todo', (req, res) =>
  run(req, res, async (data) => {
    const dat = await INCR(todos_id_max);
    const id = `${todo_id_prefix}:${dat}`;
    const todo = { id, ...data }
    await HMSET(todo_hash, id, JSON.stringify(todo));
    return todo;
  })
);

app.post('/get-todo', (req, res) => {
  run(req, res, async (data) => {
    const { id } = data;
    const todo = await get_todo(id);
    return todo;
  })
});

app.post('/update-todo', async (req, res) => {
  run(req, res, async (data) => {
    const { id } = data;
    await HMSET(todo_hash, id, JSON.stringify(data));
    return data;
  })
});

app.post('/delete-todo', async (req, res) => {

  run(req, res, async (data) => {
    const { id } = data;
    await HDEL(todo_hash, id);
    return id;
  })
});

app.post('/delete-all-todo', (req, res) =>
  run(req, res, async (data) => {
    await DEL(todo_hash);
    await DEL(todos_id_max);
    return [];
  })
);

const port = 3002;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));

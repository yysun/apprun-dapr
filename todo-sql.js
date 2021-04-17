// @ts-check
const { publish } = require('./dapr');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

const { promisify } = require("util");
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs')
const dbFile = "db/todo.db";
const exists = fs.existsSync(dbFile);
const db = new sqlite3.Database(dbFile);
db.serialize(() => {
  if (!exists) {
    db.run(`CREATE TABLE Todo (
      id          TEXT PRIMARY KEY,
      title       TEXT    NOT NULL,
      done        NUMERIC NOT NULL DEFAULT 0,
      CONSTRAINT Todo_ck_done CHECK (done IN (0, 1))
      );`);
      console.log("New table created!");
    }
  });

const db_fns = {
  all: promisify(db.all).bind(db),
  get: promisify(db.get).bind(db),
  run: promisify(db.run).bind(db),
}

console.log('Using database: ', dbFile);

// register Dapr subscriptions
app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    'get-all-todo',
    'get-todo',
    'new-todo',
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
  let result;
  try {
    const { event, data, wsid } = req.body.data;
    result = await fn(db_fns, data || {});
    result && publish(event === 'get-all-todo' ? 'all-todo' : event, {
      event,
      data: result,
      wsid
    });
    res.status(200).send(result);
  } catch (ex) {
    console.log(ex.toString());
    res.status(500).send(ex.toString());
  }
}

app.post('/get-all-todo', async (req, res) => {
  run(req, res, async ({ all }, { filter } ) => {
    const sql = 'select * from todo';
    const todos = await all(sql);
    return { filter, todos };
  });
});

app.post('/new-todo', (req, res) => {
  run(req, res, async ({ run }, { title, done, id }) => {
    const sql = 'insert into todo (title, done, id) values (?,?,?)';
    await run(sql, title, done, id);
  });
});

app.post('/get-todo', (req, res) => {
  run(req, res, async ({ get }, { id }) => {
    const sql = 'select * from todo where id=?';
    const todo = await get(sql, id);
    // return todo;
  });
});

app.post('/update-todo', async (req, res) => {
  run(req, res, async ({ run }, { done, id }) => {
    const sql = 'update todo set done=? where id=?';
    await run(sql, done, id);
    // return { title, done, id };
  })
});

app.post('/delete-todo', async (req, res) => {
  run(req, res, async ({ run }, { id }) => {
    const sql = 'delete from todo where id=?';
    await run(sql, id);
    // return id;
  })
});

app.post('/delete-all-todo', (req, res) =>
  run(req, res, async ({ run }) => {
    const sql = 'delete from todo';
    await run(sql);
    // return id;
  })
);

const port = 3004;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));

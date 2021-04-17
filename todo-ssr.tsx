/** @jsx apprun.h */
import apprun from 'apprun';
import express from 'express';
import { publish } from './dapr';

const Todo = ({todo}) => <li>
  <input type="checkbox" checked={todo.done}
    $onclick={[ '@ws', 'update-todo', {id: todo.id, done: !todo.done} ]}></input>
  <span style={{color: todo.done ? 'green' : 'red'}}>&nbsp;
    {todo.title} &nbsp;<a style="cursor: pointer"
    $onclick={['@ws', 'delete-todo', { id: todo.id }]}>✖️</a></span>
</li>;

const view = ({ filter, todos }) => {
  filter = filter ?? 0;
  const styles = _filter => ({
    'font-weight': filter === _filter ? 'bold' : 'normal',
    cursor: 'pointer'
  })
  return <div>
    <div>
      <span>Show:</span>
      <span> <a style={styles(0)} $onclick={['@ws', 'get-all-todo-ssr', {filter:0}]}>All</a></span> |
      <span> <a style={styles(1)} $onclick={['@ws', 'get-all-todo-ssr', {filter:1}]}>Todo</a></span> |
      <span> <a style={styles(2)} $onclick={['@ws', 'get-all-todo-ssr', {filter:2}]}>Done</a></span>
    </div>
    <ul>
      {
        todos
          .filter(todo => filter === 0 ||
            (filter === 1 && !todo.done) ||
            (filter === 2 && todo.done))
          .map(todo => <Todo todo={todo} />)
      }
    </ul>
    <div>
      <input placeholder='add todo' $onkeyup='keyup' id="new_todo" />
      <button $onclick='add'>Add</button>
      <button $onclick={['@ws', 'delete-all-todo']}>Clear</button>
    </div>
    <hr />
  </div>
}

const app = express();
app.use(express.json());
app.use(express.json({ type: 'application/*+json' }));

app.get('/dapr/subscribe', (_req, res) => {
  res.json([
    'get-all-todo-ssr',
    'all-todo']
    .map(sub => ({
      pubsubname: "pubsub",
      topic: sub,
      route: sub
    })));
});

app.post('/get-all-todo-ssr', (req, res) => {
  const { data } = req.body.data;
  publish('get-all-todo', { event: 'get-all-todo', data, wsid: '-' });
  res.sendStatus(200);
});

app.post('/all-todo', async (req, res) => {
  const { wsid, event, data } = req.body.data;
  const { filter, todos } = data;
  await publish('ws', { event: 'get-all-todo', data: todos, wsid: '*' });
  const todo_vdom = view({ filter, todos });
  await publish('ws', {
    event: 'get-all-todo-ssr',
    data: { todo_vdom, filter },
    wsid: '*'
  });
  res.sendStatus(200);
});

const port = 3005;
app.listen(process.env.PORT || port, () => console.log(`Service listening on port ${port}!`));
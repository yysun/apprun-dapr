import { app, Component } from 'apprun';
import marked from 'marked';

const intro = `
#### How It Works
1. When users add, delete, update, and filter the Todo list, Todo component publishes events to Dapr through the WebSocket.
2. The todo redis service (todo-service.js) receives the event and updates redis db
3. The todo sql service (todo-sql.js) receives the event and updates sql db
4. The web server (server.js) receives the result form Dapr PubSub and sends it back to the client through the WebSocket
5. Todo components receives the state and renders the web page

### Notes
1. All all events (_create-todo_, _update-todo_, _delete-to-do_, _get-all-todo_, _new-todo_) are stored as the redis streams by Dapr
2. When a new Dapr application id is registered, the application will receive all the events
3. The todo redis service handles the _create-todo_ event to generate the primiary key and publishes the _new-todo_ event
4. The todo sql service handles the _new-todo_ event to create a todo item in sql
5. The _get-all-todo_ is handled by the todo sql service to load data from sql
6. Run 'node db/test' to view the data from sql
`;

const ENTER = 13

const init_state = {
  filter: 0,
  todos: [],
}

const keyup = e => {
  if (e.keyCode === ENTER && e.target.value) {
    add();
  }
};

const add = () => {
  const input = document.getElementById('new_todo') as HTMLInputElement;
  app.run('@ws', 'create-todo', {
    title: input.value,
    done: 0
  });
  input.value = '';
};

const toggle = (_, todo) => { app.run('@ws', 'update-todo', { ...todo, done: !todo.done }) };

const remove = (_, todo) => { app.run('@ws', 'delete-todo', todo) };

const clear = () => { app.run('@ws', 'delete-all-todo') };

const search = (state, filter) => ({ ...state, filter });

const Todo = ({todo}) => <li>
  <input type="checkbox" checked={todo.done} $onclick={[toggle, todo]}></input>
  <span style={{color: todo.done ? 'green' : 'red'}}>&nbsp;
    {todo.title} &nbsp;<a href='javascript:void(0)' $onclick={[remove, todo]}>✖️</a></span>
</li>;

export default class TodoComponent2 extends Component {
  state = () => {
    app.run('@ws', 'get-all-todo');
    return init_state;
  }

  view = ({ filter, todos }) => {
    if (location.hash !== '#Todo') return;
    const styles = _filter => ({
      'font-weight': filter === _filter ? 'bold' : 'normal',
      cursor: 'pointer'
    })
    return <div>
      <h3>Todo</h3>
      <div>
        <span>Show:</span>
        <span> <a style={styles(0)} $onclick={[search, 0]}>All</a></span> |
        <span> <a style={styles(1)} $onclick={[search, 1]}>Todo</a></span> |
        <span> <a style={styles(2)} $onclick={[search, 2]}>Done</a></span>
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
        <input placeholder='add todo' onkeyup={keyup} id="new_todo" />
        <button $onclick={[add]}>Add</button>
        <button $onclick={[clear]}>Clear</button>
      </div>
      <hr />
      <div>{'_html:' + marked(intro)}</div>
    </div>
  }

  update = {
    '#Todo': state => state,
    '@@create-todo, @@delete-todo, @@update-todo, @@delete-all-todo':
      ({ filter }) => { app.run('@ws', 'get-all-todo-ssr', { filter }); },
    '@@get-all-todo': (state, todos) => ({ ...state, todos })
  };
}

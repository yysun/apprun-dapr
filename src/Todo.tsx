import { app, Component } from 'apprun';
import marked from 'marked';

const intro = `
#### How It Works
1. When users add, delete, update, and filter the Todo list, Todo component publishes events to Dapr through the WebSocket.
2. The todo service (todo-service.js) receives the event and updates redis db
3. The todo service publishes the result to Dapr PubSub
4. The web server (server.js) receives the result form Dapr PubSub and sends it back to the client through the WebSocket
5. Todo components receives the state and renders the web page
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
  state = () => { app.run('@ws', 'get-all-todo'); return init_state; }

  view = (state) => {
    const styles = (filter) => ({
      'font-weight': state.filter === filter ? 'bold' : 'normal',
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
          state.todos
            .filter(todo => state.filter === 0 ||
              (state.filter === 1 && !todo.done) ||
              (state.filter === 2 && todo.done))
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
      () => { app.run('@ws', 'get-all-todo'); },
    '@@get-all-todo': (state, todos) => {
      const new_state = ({ ...state, todos });
      this.setState(new_state, { render: location.hash === '#Todo' });
    }
  };
}

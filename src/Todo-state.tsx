import { app, Component } from 'apprun';
import marked from 'marked';

const intro = `
#### How It Works
1. Todo component generates an app_id and stores it in the local storage
2. Todo component publishes the 'get-state' event to Dapr using the app_id as the key through the WebSocket
3. The state service (state-service.js) receives the event and gets the state from Dapr state store
4. The state service publishes the result to Dapr PubSub
5. The web server (server.js) receives the result form Dapr PubSub and sends it back to the client through the WebSocket
6. Todo components receives the state and renders the web page
7. When users add, delete, update, and filter the Todo list, Todo component's state changes.
8. Todo component publishes 'save-state' event to Dapr with the app_id and the changed state
9. The state service receives the event and saves the state to Dapr state store
`;

let app_id = localStorage.getItem('app_id');
if (!app_id) {
  app_id = Date.now().toString();
  localStorage.setItem('app_id', app_id)
}

const ENTER = 13

const init_state = {
  filter: 0,
  todos: [],
}

const keyup = (state, e) => {
  const input = e.target;
  state.new_todo = input.value.trim();
  if (e.keyCode === 13 && state.new_todo) {
    input.value = '';
    return add(state);
  }
};

const add = (state) => ({
  ...state,
  todos: [...state.todos, { title: state.new_todo, done: false }]
});
const toggle = (state, idx) => ({
  ...state,
  todos: [
    ...state.todos.slice(0, idx),
    { ...state.todos[idx], done: !state.todos[idx].done },
    ...state.todos.slice(idx + 1)
  ]
});

const remove = (state, idx) => ({
  ...state,
  todos: [
    ...state.todos.slice(0, idx),
    ...state.todos.slice(idx + 1)
  ]
});

const clear = () => init_state;

const search = (state, filter) => ({ ...state, filter });

const Todo = ({todo, idx}) => <li>
  <input type="checkbox" checked={todo.done} $onclick={[toggle, idx]}></input>
  <span style={{color: todo.done ? 'green' : 'red'}}>&nbsp;
    {todo.title} &nbsp;<a href='javascript:void(0)' $onclick={[remove, idx]}>✖️</a></span>
</li>;

export default class TodoComponent extends Component {
  state = () => {
    app.run('@ws', 'get-state', { key: app_id });
  }

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
            .map((todo, idx) => <Todo todo={todo} idx={idx} />)
        }
      </ul>
      <div>
        <input placeholder='add todo' $onkeyup={keyup}/>
        <button $onclick={[add]}>Add</button>
        <button $onclick={[clear]}>Clear</button>
      </div>
      <hr />
      <div>{'_html:' + marked(intro)}</div>
    </div>
  }

  update = {
    '#Todo': state => state,
    '@@get-state': (_, data) => {
      const new_state = data && JSON.parse(data);
      this.setState(new_state || init_state, { render: location.hash === '#Todo' });
    },
    '@@save-state': state => { }
  };

  rendered = state => app.run('@ws', 'save-state', {key: app_id, value: state });
}

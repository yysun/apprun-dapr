import { app, Component } from 'apprun';

let app_id = localStorage.getItem('app_id');
if (!app_id) {
  app_id = Date.now().toString();
  localStorage.setItem('app_id', app_id)
}

const ENTER = 13

const init_state = {
  filter: 0,
  list: [],
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
  list: [...state.list, { title: state.new_todo, done: false }]
});
const toggle = (state, idx) => ({
  ...state,
  list: [
    ...state.list.slice(0, idx),
    { ...state.list[idx], done: !state.list[idx].done },
    ...state.list.slice(idx + 1)
  ]
});

const remove = (state, idx) => ({
  ...state,
  list: [
    ...state.list.slice(0, idx),
    ...state.list.slice(idx + 1)
  ]
});

const clear = () => init_state;

const search = (state, filter) => ({ ...state, filter });

const Todo = ({todo, idx}) => <li>
  <input type="checkbox" checked={todo.done} $onclick={[toggle, idx]}></input>
  <span style={{color: todo.done ? 'green' : 'red'}}>&nbsp;
    {todo.title} &nbsp;<a href='javascript:void(0)' $onclick={[remove, idx]}>✖️</a></span>
</li>;

export default class extends Component {
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
          state.list
            .filter(todo => state.filter === 0 ||
              (state.filter === 1 && !todo.done) ||
              (state.filter === 2 && todo.done))
            .map((todo, idx) => <Todo todo={todo} idx={idx} />)
        }
      </ul>
      <div>
        <input placeholder='add todo' $onkeyup={keyup} />
        <button $onclick={[add]}>Add</button>
        <button $onclick={[clear]}>Clear</button>
      </div>
    </div>
  }

  update = {
    '#Todo': state => state,
    '@@get-state': (_, state) => {
      this.setState(state || init_state, { render: location.hash === '#Todo' });
    },
    '@@save-state': state => { }
  };

  rendered = state => app.run('@ws', 'save-state', {key: app_id, value: state });
}

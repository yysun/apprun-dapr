import app, { Component } from 'apprun';

const ENTER = 13

const state = {
  filter: 0,
  todos: []
}

const keyup = e => {
  const input = e.target;
  if (e.keyCode === ENTER && input.value) {
    add();
    input.value = '';
  }
};

const add = () => {
  app.run('@ws', 'create', {
    title: (document.getElementById('new_todo') as HTMLInputElement).value,
    done: 0
  })
};

const toggle = (_, todo) => { app.run('@ws', 'update', { ...todo, done: !todo.done }) };

const remove = (_, todo) => { app.run('@ws', 'delete', todo) };

const clear = () => { app.run('@ws', 'delete-all') };

const search = (state, filter) => ({ ...state, filter });

const Todo = ({todo}) => <li>
  <input type="checkbox" checked={todo.done} $onclick={[toggle, todo]}></input>
  <span style={{color: todo.done ? 'green' : 'red'}}>
    {todo.title} <a href='#' $onclick={[remove, todo]}>&#9249;</a></span>
  <span>({todo.ip})</span>
</li>;

const view = (state) => {
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
            (state.filter === 2 && todo.done) )
          .map((todo) => <Todo todo={todo} />)
      }
    </ul>
    <div>
      <input placeholder='add todo' onkeyup={keyup} id="new_todo"/>
      <button $onclick={[add]}>Add</button>
      <button $onclick={[clear]}>Clear</button>
    </div>
  </div>
}

const update = {
  '#Todo': state => state,

  '@get-all': (state, todos) => ({ ...state, todos }),

  '@create': (state, todo) => ({
    ...state, todos: [...state.todos, todo], filter:0
  }),

  '@update': (state, todo) => {
    const idx = state.todos.findIndex(i => i.id === todo.id);
    if (idx < 0) app.run('@ws', 'get-all');
    else return ({
      ...state,
      todos: [
        ...state.todos.slice(0, idx),
        todo,
        ...state.todos.slice(idx + 1)
      ]
    });
  },

  '@delete': (state, todo) => {
    const idx = state.todos.findIndex(i => i.id === todo.id);
    if (idx < 0) app.run('@ws', 'get-all');
    else return ({
      ...state,
      todos: [
        ...state.todos.slice(0, idx),
        ...state.todos.slice(idx + 1)
      ]
    });
  },

  '@delete-all': state => ({ ...state, todos: [] })
}

export default new Component(state, view, update);

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
  todo_vdom: [],
}

const add = () => {
  const input = document.getElementById('new_todo') as HTMLInputElement;
  app.run('@ws', 'create-todo', {
    title: input.value,
    done: 0
  });
  input.value = '';
};

export default class TodoSSRComponent extends Component {
  state = () => {
    app.run('@ws', 'get-all-todo-ssr', { filter: 0 });
    return init_state;
  }

  view = ({ todo_vdom }) => {
    if (location.hash !== '#TodoSSR') return;
    return <div>
      <h3>Todo (server-side rendering)</h3>
      {todo_vdom}
      <div>{'_html:' + marked(intro)}</div>
    </div>
  }

  update = {
    '#TodoSSR': state => state,
    add,
    keyup: (_, e) => {
      if (e.keyCode === ENTER && e.target.value) add();
    },
    '@@create-todo, @@delete-todo, @@update-todo, @@delete-all-todo': ({ filter }) => {
      app.run('@ws', 'get-all-todo-ssr', { filter });
    },
    '@@get-all-todo-ssr': (_, state) => state
  };
}

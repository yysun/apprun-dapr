import { app, Component } from 'apprun';
import marked from 'marked';

const intro = `
#### How It Works
1. User click the buttons
2. The local event handler publishes an AppRun event: '@ws' with payload _'add', state, (-1 or +1)_
3. AppRun global event handler sends the payload to the WebSocket
4. The web server (index.js) receives the WebSocket message and then publishes an Dapr PubSub event
5. The Add service (add-service.js) receives the Dapr event. It does the 'add' calculation and then publishes the result to Dapr PubSub
6. The web server receives the Dapr event and send it back to the client through the WebSocket
7. The client side app receives the WebSocket message and publishes an AppRun global event '@@add'
8. The Counter component handles the '@@add' event and sets the new state. AppRun renders the new state
9. The '@@add' event is a WebSocket broadcast event, therefor all tabs will see the new counter value

### State Management
1. The Counter component publishes the 'get-state' event to Dapr using the app_id as the key through the WebSocket
3. The state service (state-service.js) receives the event and gets the state from Dapr state store and send it to Darp PubSub
5. The web server (server.js) receives the state form Dapr PubSub and sends it back to the client through the WebSocket
6. The Counter component handles the '@@get-state' event and sets the new state. AppRun renders the new state
7. Each time the Counter component handles the '@@add' event, it also publishes the 'save-state' event to Dapr
8. New browser tabs/windows will get the stored state
`;

const app_id = 'counter-app'

export default class Counter extends Component {
  state = () => {
    app.run('@ws', 'get-state', { key: app_id });
  }

  view = state => location.hash === '#Counter' && <div>
    <h3>Counter</h3>
    <h1>{state}</h1>
    <button $onclick={['@ws', 'add', [state, -1]]}>-1</button>
    <button $onclick={['@ws', 'add', [state, +1]]}>+1</button>
    <hr />
    <div>{'_html:' + marked(intro)}</div>
  </div>;

  update = {
    '#Counter': state => state,
    '@@add': (_, v) => {
      const value = Number(v);
      app.run('@ws', 'save-state', { key: app_id, value });
      return value;
    },
    '@@save-state': () => { },
    '@@get-state': (_, state) => Number(state)
  };
}



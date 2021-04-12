import { app, Component } from 'apprun';
import marked from 'marked';
import './ws';

const intro = `
#### How It Works
1. User click the button
2. The Counter component publishes an AppRun local event ('-1' or '+1')
3. The local event handler publishes an AppRun global event: '@ws' with payload _{event: 'add', data: [state, delta]}_
4. AppRun global event handler sends the payload to the WebSocket
5. The web server (index.js) receives the WebSocket message and then publishes an Dapr PubSub message
6. The Dapr service (service.js) receives the Dapr message. It does the 'add' calculation and then publishes the result to Dapr PubSub
7. The web server receives the Dapr message and send it back to the client through the WebSocket
8. The client side app receives the WebSocket message and publishes an AppRun global event '@@'
9. The Counter component handles the '@@' event and sets the new state. AppRun renders the new state.
`;

export default class Counter extends Component {
  state = 0;

  view = state => <div>
    <h1>{state}</h1>
    <button $onclick='-1'>-1</button>
    <button $onclick='+1'>+1</button>
    <hr />
    <div>{'_html:' + marked(intro)}</div>
  </div>;

  update = {
    '#, #Home, #Counter': state => state,
    '-1': state => { app.run('@ws', 'add', [state, -1]) },
    '+1': state => { app.run('@ws', 'add', [state, +1]) },
    '@@add': (_, v) => v
  };
}



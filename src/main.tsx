import { app, Component } from 'apprun';

class Counter extends Component {
  state = 0;

  view = state => <div>
    <h1>{state}</h1>
    <button $onclick={['add', -1]}>-1</button>
    <button $onclick={['@add', state, 1]}>+1</button>
  </div>;

  update = {
    'add': (state, delta) => state + delta,
    '@@': (_, v) => v
  };
}

new Counter().start(document.body);

let ws;
function open_ws() {
  ws = new WebSocket(`ws://${location.host}`);
  ws.onopen = () => console.log('websocket connected');
  ws.onclose = () => console.log('websocket disconnected');
  ws.onmessage = function (msg) {
    console.log('received: ', msg.data);
    const { event, data } = JSON.parse(msg.data);
    app.run('@@', data);
  }
}
open_ws();

app.on('@add', (state, delta) => {
  if (ws.readyState === WebSocket.CLOSED) open_ws();
  const msg = {
    event: 'add',
    data: [ state, delta ]
  };
  console.log('sending: ', msg);
  ws.send(JSON.stringify(msg));
});

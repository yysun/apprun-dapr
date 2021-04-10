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

const ws = new WebSocket(`ws://${location.host}`);
ws.onopen = () => console.log('websocket connected');

ws.onmessage = function (msg) {
  console.log('received: ', msg.data);
  const { event, data} = JSON.parse(msg.data);
  app.run('@@', data);
}

app.on('@add', (state, delta) => {
  // console.log(state, delta);
  // const value = state + delta;
  // app.run('@value', value);

  const msg = {
    event: 'add',
    data: [ state, delta ]
  };
  console.log('sending: ', msg);
  ws.send(JSON.stringify(msg));
});

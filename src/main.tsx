import { app, Component } from 'apprun';

class Counter extends Component {
  state = 0;

  view = state => <div>
    <h1>{state}</h1>
    <button $onclick={['add', -1]}>-1</button>
    <button $onclick={['@ws:add', state, 1]}>+1</button>
  </div>;

  update = {
    'add': (state, delta) => state + delta,
    '@value': (_, v) => v
  };
}

new Counter().start(document.body);

const ws = new WebSocket(`ws://${location.host}`);
ws.onopen = () => console.log('websocket connected');

ws.onmessage = function (msg) {
  console.log('received: ', JSON.parse(msg.data));
  app.run('@value', JSON.parse(msg.data));
}

// app.on('@ws:add', (state, delta) => {
//   console.log(state, delta);
//   const value = state + delta;
//   app.run('@value', value);
// });

app.on('@ws:*', (state, delta, _, { event }) => {
  const msg = {
    event: event.replace('@ws:', ''),
    data: { state, delta }
  };
  console.log('sending: ', msg);
  ws.send(JSON.stringify(msg));
});


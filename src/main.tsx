import app from 'apprun';

const state = 0;

const view = state => <div>
  <h1>{state}</h1>
  <button $onclick={['//ws:','-1']}>-1</button>
  <button $onclick={['//ws:','+1']}>+1</button>
</div>;

const update = {
  '+1': state => state + 1,
  '-1': state => state - 1
};

app.start(document.body, state, view, update);


const ws = new WebSocket(`ws://${location.host}`);
ws.onopen = () => console.log('websocket connected');

ws.onmessage = function (msg) {
  console.log(JSON.parse(msg.data));
  // const { event, state } = JSON.parse(msg.data);
  // app.run(event, state);
}

app.on('//ws:', (event) => {
  const msg = { event };
  console.log('sending event: ', msg);
  ws.send(JSON.stringify(msg));
});


import app from 'apprun';

let ws;
let ws_queue = [];

const ws_send = msg => {
  console.log('sending: ', msg);
  ws.send(JSON.stringify(msg));
}

const open_ws = () => {
  ws = new WebSocket(`ws://${location.host}`);
  ws.onopen = () => {
    console.log('websocket connected');
    ws_queue.forEach(msg => ws_send(msg));
    ws_queue = [];
  }
  ws.onclose = () => {
    console.log('websocket disconnected');
    ws = null;
  }
  ws.onmessage = (msg) => {
    const { event, data } = JSON.parse(msg.data);
    console.log('received: ', event, data);
    app.run('@@' + event, data ? JSON.parse(data) : '');
  }
}
app.on('@ws', (event, data) => {
  const msg = { event, data };
  if (!ws) open_ws();
  if (ws.readyState === WebSocket.OPEN) ws_send(msg);
  else ws_queue.push(msg);
});
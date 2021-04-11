import app from 'apprun';

let ws;
function open_ws() {
  ws = new WebSocket(`ws://${location.host}`);
  ws.onopen = () => console.log('websocket connected');
  ws.onclose = () => {
    console.log('websocket disconnected');
    ws = null;
  }
  ws.onmessage = (msg) => {
    console.log('received: ', msg.data);
    const { event, data } = JSON.parse(msg.data);
    app.run('@@' + event, data);
  }
}

open_ws();

app.on('@ws', (event, data) => {
  if (!ws || ws.readyState === WebSocket.CLOSED) open_ws();
  const msg = { event, data };
  console.log('sending: ', msg);
  ws.send(JSON.stringify(msg));
});
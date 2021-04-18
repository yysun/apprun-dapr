// @ts-check
const fetch = require('node-fetch');

const zipkin_api_url = 'http://localhost:9411/api/v2/spans';
const headers = { 'Content-Type': 'application/json' };

const post = async (url, data) => {
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers
  });
  return response.text();
}

module.exports = (name, local, remote, wsid) => {
  const id = Math.random().toString(10).substring(2, 18);
  const data = [{
    id,
    traceId: id,
    name,
    "timestamp": Math.round((new Date()).getTime()) * 1000,
    "duration": 1000,
    "kind": "SERVER",
    "localEndpoint": {
      "serviceName": local,
    },
    "remoteEndpoint": {
      "serviceName": remote,
    },
    "tags": {
      "websocketid": wsid,
      "messaging.destination_kind": "topic",
      "messaging.system": "pubsub"
    }
  }];

  post(zipkin_api_url, data).then(
    text => console.log('traceid:', id, text)
  );
}

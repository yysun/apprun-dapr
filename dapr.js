const fetch = require('node-fetch');

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const pubsubName = 'pubsub';
const storeName = 'statestore';
const headers = { 'Content-Type': 'application/json' };

const get = async url => {
  const response = await fetch(url, { headers });
  return response.text();
}

const post = async (url, data) => {
  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers
  });
  return response.text();
}

module.exports = {
  publish: async (topic, data) => {
    if (topic === 'ws') topic += '?metadata.ttlInSeconds=1';
    console.log("Publishing: ", topic, data);
    const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
    return post(publishUrl, data);
  },

  saveState: async (key, value) => {
    const storeUrl = `${daprUrl}/state/${storeName}`;
    const state = [{ key, value }];
    return post(storeUrl, state);
  },

  getState: async (key) => {
    const storeUrl = `${daprUrl}/state/${storeName}/${key}`;
    return get(storeUrl);
  }

}
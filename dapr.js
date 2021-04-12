const fetch = require('node-fetch');

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const pubsubName = 'pubsub';
const storeName = 'statestore';
const headers = { 'Content-Type': 'application/json' };

module.exports = {
  
  publish: async (topic, data) => {
    console.log("Publishing: ", topic, data);
    const publishUrl = `${daprUrl}/publish/${pubsubName}/${topic}`;
    const response = await fetch(publishUrl, {
        method: 'post',
        body: JSON.stringify(data),
        headers
    });
    return response.text();
  },

  saveState: async (key, value) => {
    const storeUrl = `${daprUrl}/state/${storeName}`;
    const state = [{key, value}];
    const response = await fetch(storeUrl, {
      method: 'post',
      body: JSON.stringify(state),
      headers
    });
    return response.text();
  },

  getState: async (key) => {
    const storeUrl = `${daprUrl}/state/${storeName}/${key}`;
    const response = await fetch(storeUrl, {
      headers
    });
    return response.text();
  }

}
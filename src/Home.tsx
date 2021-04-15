import { app, Component } from 'apprun';
import marked from 'marked';

const intro = `
### Introduction

This is a demo of using AppRun with Dapr through WebSockets.

* [AppRun](https://github.com/yysun/apprun) is a JavaScript library that uses the Elm-inspired architecture, events, and components.
* [Dapr](https://dapr.io) is a portable, serverless, event-driven runtime for building resilient, stateless and stateful microservices.

![](apprun-dapr-demo.png)

* [Counter app](/#Counter) - example of using [Dapr PubSub](https://docs.dapr.io/developing-applications/building-blocks/pubsub/)
* [Todo app](/#Todo) - example of using [Dapr State Management](https://docs.dapr.io/developing-applications/building-blocks/state-management/state-management-overview/)
`
export default class extends Component {
  state = 'Home'

  view = state => <>
    <style>{`.home img { max-width:80% }`} </style>
    <div class='home'>{'_html:' + marked(intro)}</div>
  </>;

  update = {
    '#, #Home': state => state,
  }
}
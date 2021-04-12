import { app, Component } from 'apprun';
import './ws';

export default class Counter extends Component {
  state = 0;

  view = state => <div>
    <h1>{state}</h1>
    <button $onclick='-1'>-1</button>
    <button $onclick='+1'>+1</button>
  </div>;

  update = {
    '#, #Home, #Counter': state => state,
    '-1': state => { app.run('@ws', 'add', [state, -1]) },
    '+1': state => { app.run('@ws', 'add', [state, +1]) },
    '@@add': (_, v) => v
  };
}



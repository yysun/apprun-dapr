import app from 'apprun';
import Layout from './Layout';
import Home from './Home';
import Counter from './Counter';
import Todo from './Todo';

app.render(document.body, <Layout />);

const element = 'my-app';
new Home().start(element);
new Counter().start(element);
Todo.start(element);

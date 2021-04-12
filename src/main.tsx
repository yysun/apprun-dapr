import app from 'apprun';
import Layout from './Layout';
import Home from './Home';
import Counter from './Counter';
import Todo from './Todo';

app.render(document.body, <Layout />);

const element = 'my-app';
new Home().mount(element);
new Counter().mount(element);
new Todo().mount(element);

import app from 'apprun';
import Layout from './Layout';
import Counter from './Counter';

app.render(document.body, <Layout />);

const element = 'my-app';
new Counter().start(element);

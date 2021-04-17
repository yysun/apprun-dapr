
import app from 'apprun';

app.on('//', (route) => {
  const menus = document.querySelectorAll('.navbar-nav li');
  for (let i = 0; i < menus.length; ++i) {menus[i].classList.remove('active');}
  const item = document.querySelector(`[href='${route}']`);
  item && item.parentElement.classList.add('active');
});

export default () => <div class="container">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">AppRun ❤️ Dapr</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#Home">Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Counter">Counter</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#Todo">Todo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#TodoSSR">Todo (SSR)</a>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a class="nav-link" href="https://github.com/yysun/apprun-dapr" target="_blank">Github</a></li>
      </ul>
    </div>
  </nav>
  <div class="container" id="my-app"></div>
</div>;

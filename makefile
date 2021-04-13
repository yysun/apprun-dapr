client:
	esbuild src/main.tsx --outfile=public/main.js --bundle --minify --sourcemap --watch

dapr:
	dapr run --dapr-http-port 3500 -d=./components --app-id apprun-dapr

webserver:
	dapr run -d=./components --app-id server --app-port 8000 node .

service:
	dapr run -d=./components --app-id service --app-port 3000 node service.js

state-service:
	dapr run -d=./components --app-id state-service --app-port 3001 node state-service.js

todo-service:
	dapr run -d=./components --app-id todo-service --app-port 3002 node todo-service.js

start: client dapr webserver service todo-service state-service




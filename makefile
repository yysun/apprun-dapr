dapr:
	dapr run --dapr-http-port 3500 -d=./components --app-id apprun-dapr

dashboard:
	dapr dashboard

build-app:
	npx esbuild src/main.tsx --outfile=public/main.js --bundle --minify --sourcemap

watch-app:
	npx esbuild src/main.tsx --outfile=public/main.js --bundle --minify --sourcemap --watch

run-app:
	open "http://localhost:8000"

webserver:
	dapr run -d=./components --app-id webserver --app-port 8000 node .

add-service:
	dapr run -d=./components --app-id add-service --app-port 3000 node add-service.js

state-service:
	dapr run -d=./components --app-id state-service --app-port 3001 node state-service.js

todo-service:
	dapr run -d=./components --app-id todo-service --app-port 3002 node todo-service.js

todo-stream:
	dapr run -d=./components --app-id todo-stream --app-port 3003 node todo-stream.js

todo-sql:
	dapr run -d=./components --app-id todo-sql --app-port 3004 node todo-sql.js

start: dapr dashboard webserver add-service state-service todo-service todo-sql todo-stream watch-app run-app




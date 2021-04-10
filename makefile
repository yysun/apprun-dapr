client:
	esbuild src/main.tsx --outfile=dist/main.js --bundle --minify --sourcemap --watch

dapr:
	dapr run --dapr-http-port 3500 -d=./components

webserver:
	dapr run -d=./components --app-id server --app-port 8080 node .

service:
	dapr run -d=./components --app-id service --app-port 3000 node service.js

start: client dapr webserver service




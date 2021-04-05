## Use AppRun with Dapr

![](apprun-dapr.png)

## Start dapr

```
dapr run --dapr-http-port 3500
```

## Start Web Server

```
dapr run --app-id server --app-port 8080 node .
```

## Start a Service

```
dapr run --app-id service --app-port 3000 node service.js
```

## Run Frontend App

http://localhost:8080



## Publish a Message

```
dapr publish --publish-app-id service --pubsub pubsub --topic add --data '{"data":[1,10],"id":"dapr"}'
```



.
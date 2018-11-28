# check-tests


## Install npm dependencies
```
yarn install
```

## To start and load the front-end app from docker container. 
```
yarn run build
docker-compose up --build
```
You will be able to access the app on http://localhost:4000

## To run UI in webpack-dev-server & backend in docker container.
```
docker-compose up --build
yarn run serve
```
You will be able to access the app on http://localhost:8080

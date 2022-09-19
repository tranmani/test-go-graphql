# How to run the BE

1. Install Go: https://go.dev/doc/install

Run the bellow commands in the terminal from the project directory:

```
cd go-graphql
go mod download
go run server.go
```

2. When making change to the schema, run the following commands to generate new models:

```
go get github.com/99designs/gqlgen@v0.17.17
go run github.com/99designs/gqlgen generate
```

# How to run the FE

1. Install npm: https://nodejs.org/en/download/

OR

Install yarn (required npm to be installed first): `npm install --g yarn`

2. Run the bellow commands in the terminal from the project directory:

```
cd fe
npm i OR yarn
npm run start
```

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { render } from "react-dom";
import App from "./App";

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
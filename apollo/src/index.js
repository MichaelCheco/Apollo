import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag"
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import "./index.css";

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app 🚀</h2>
            <ExchangeRates />
        </div>
    </ApolloProvider>
)
const ExchangeRates = () => (
    <Query
      query={gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
  
        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{`${currency}: ${rate}`}</p>
          </div>
        ));
      }}
    </Query>
  );

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

client
.query({
    query: gql`
        {
            rates(currency: "USD") {
                currency
            }
        }
    `
})
.then(result => console.log(result))

ReactDOM.render(<App />, document.getElementById("root"));

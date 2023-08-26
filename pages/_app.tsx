import React from "react";
import { AppProps } from "next/app";
import ReactGA from "react-ga4";
import { ApolloClient, ApolloProvider, DefaultOptions } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { InMemoryCache, createHttpLink, ApolloLink } from "@apollo/client";


// component
import { WSMessage } from "src/component/common";
// Helpers
import {
  localStorageClear,
  getLocalStorageItem,
} from "src/utils/helper";
import { NetworkOnly, StaticString } from "src/utils/enums";

//CSS
import "../assets/less/global.less";

export const adminCache = new InMemoryCache({ addTypename: true });
export const clientCache = new InMemoryCache({ addTypename: false });

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL, // REACT_APP_BASE_URL
});
// import 'bootstrap/dist/css/bootstrap.css'// own css files here

//ADMIN URL LINK
const secondhttpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL_ADMIN, // REACT_APP_BASE_URL
});

const errorLink = onError((error) => {
  const { graphQLErrors } = error;
  if (graphQLErrors)
    graphQLErrors.map((errorGraphql: any) => {
      if (
        errorGraphql.extensions.code === StaticString.UNAUTHENTICATED_CAPS ||
        errorGraphql.message === StaticString.JWT ||
        errorGraphql.message === StaticString.UNAUTHENTICATED_SMALL ||
        errorGraphql.message === StaticString.SOMETHING_WENT_WRONG
      ) {
        localStorageClear();
      }
      return WSMessage({
        type: "error",
        messageValue: errorGraphql.message,
      });
    });
});

//ADMIN TOKEN
const authLink2 = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = getLocalStorageItem("admin_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = getLocalStorageItem("auth_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: NetworkOnly,
    errorPolicy: 'all',
  },
};
export const client = new ApolloClient({
  cache: clientCache,
  defaultOptions,
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
});

//ADMIN CLIENT
export const clientAdmin = new ApolloClient({
  cache: adminCache,
  defaultOptions,
  link: ApolloLink.from([errorLink, authLink2.concat(secondhttpLink)]),

});

const ApollowLayout: React.FC<AppProps> = (props: AppProps) => {
  const { Component, pageProps } = props;
  // google analytic init
  ReactGA.initialize(process.env.REACT_APP_GA_KEY || 'G-3EQPNTQ7K3');

  return (
    <ApolloProvider client={client}>
      <>
        <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
        />
        <Component {...pageProps} />
      </>
    </ApolloProvider>
  );
};

export default ApollowLayout;

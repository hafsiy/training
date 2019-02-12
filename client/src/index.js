import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
// import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
// import SingIn from './component/SignIn';
import './App.css';
import Routers from './router';

// import App from './App';


const client = new ApolloClient({
 uri : 'http://localhost:4000/graphql'
 });

 ReactDOM.render(
  <ApolloProvider client={client}>
  <BrowserRouter>
      <Routers/>
  </BrowserRouter>
  </ApolloProvider>,
 document.getElementById("root"));
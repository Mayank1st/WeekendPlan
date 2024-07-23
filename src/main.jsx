import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import StoreProvider from "./app/StoreProvider";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import store from ".//lib/store"; // Correct import path
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <ChakraProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ChakraProvider>
    </Router>
  </Provider>
);

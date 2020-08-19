import React from "react";
import ReactDOM from "react-dom";

//styles
import "@style/style.scss";

//components
import App from "./App";
// tools
import Favicon from "react-favicon";
import * as serviceWorker from "./serviceWorker";
//translation
import "./i18n/i18n";

//store
import { AdminStoreProvider } from "@store/admin-store";

const root = document.getElementById("root");
const urlIcon = "favicon.ico";

ReactDOM.render(
  <React.StrictMode>
    <AdminStoreProvider>
      <Favicon url={urlIcon} />
      <App />
    </AdminStoreProvider>
  </React.StrictMode>,
  root
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

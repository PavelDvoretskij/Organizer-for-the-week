import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./redux-state/store.js";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

import "./assets/css/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App.jsx";
import store from "./redux/store.js";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/reset.css"; // This is the updated import for Ant Design 5.x

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>
);

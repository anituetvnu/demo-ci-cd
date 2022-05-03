import React from "react";
import { createBrowserHistory } from "history";
import "./App.css";

const defaultHistory = createBrowserHistory();

function App({ history = defaultHistory }) {
  return (
    <div>
      <p>MICRO FRONTEND DEMO</p>
    </div>
  );
}

export default App;

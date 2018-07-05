import React, { Component } from "react";

import Scheduler from "./Scheduler";

class App extends Component {
  render() {
    return (
      <div className="wrap">
        <div className="container">
          <Scheduler />
        </div>
      </div>
    );
  }
}

export default App;

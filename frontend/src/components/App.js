import React, { Component } from 'react';

import SchedulerContainer from './SchedulerContainer'

class App extends Component {
    render() {
        return (
            <div className="wrap">
                <div className="container">
                    <SchedulerContainer />            
                </div>
            </div>
        );
    }
}

export default App;

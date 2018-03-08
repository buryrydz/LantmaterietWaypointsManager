import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    </Provider>
    , document.querySelector('.container-fluid')
);


// REDUX:
// List of Waypoints
// List of Searched Waypoints / Presentational List of Waypoints
// Currently Selected Waypoint

// REACT LOCAL:
// Search Term 
// Add Waypoint Enabled
// Import Waypoints Enabled
// Export Waypoints Enabled
// Clear Waypoints Enabled
// Edit Waypoint Name Enabled
// Delete Waypoint Enabled
// Add Waypoint To Favorites Enabled
// Show Modal (one for Clear Waypoints and one for Delete Waypoint)
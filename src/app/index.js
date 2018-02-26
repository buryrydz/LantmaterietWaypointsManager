import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import App from './containers/app';
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
// List of Searched Waypoints
// Currently Selected Waypoint

// REACT LOCAL:
// Search Term
// Add Waypoint
// Import Waypoints
// Export Waypoints
// Clear Waypoints
// Edit Waypoint Name
// Delete Waypoint
// Add Waypoint To Favorites
// Show Modal (one for Clear Waypoints and one for Delete Waypoint)
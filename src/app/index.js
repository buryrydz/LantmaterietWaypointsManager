import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
    // <Provider store={createStoreWithMiddleware(reducers)}>
        <App />
    // </Provider>
    , document.querySelector('.container-fluid')
);

// waypoint_list
// waypoint_list_item
// waypoint_list_item_selected
// search_bar
// menu_right
// map_main
// map
// menu_upper


// List of Waypoints
// List of Searched Waypoints
// Currently Selected Waypoint
// Search Term
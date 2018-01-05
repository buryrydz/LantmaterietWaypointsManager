import React from 'react';
import SearchBar from './search_bar';
import WaypointList from '../containers/waypoint_list';

export default () => {
    return (
        <div className="card">
            <div className="card-header p-1">
                <SearchBar />
            </div>
            <div className="card-body p-1">
                <WaypointList />
            </div>
        </div>
    )
}
import React from 'react';

const SearchBar = (props) => {
    function setNextActiveWaypoint() {
        let nextActiveWaypointIndex;
        const presentationalWaypointsLength = props.presentationalWaypoints.length;
        if (presentationalWaypointsLength == 0) {
            return false
        }
        if (props.activeWaypoint) {
            const activeWaypointOnPresentationalWaypointsList = props.presentationalWaypoints.find((waypoint, index) => {
                nextActiveWaypointIndex = index + 1;
                return (waypoint.waypointId == props.activeWaypoint.waypointId);
            });
            if (nextActiveWaypointIndex >= presentationalWaypointsLength) {
                nextActiveWaypointIndex = 0;
            }
        } else {
            nextActiveWaypointIndex = 0;
        }
        const nextActiveWaypoint = props.presentationalWaypoints[nextActiveWaypointIndex];
        props.waypointsActions.selectWaypoint(nextActiveWaypoint);
    }

    return (
        <div className="input-group">
            <input onKeyUp={(event) => props.onSearchTermChanged(event.target.value)} type="text" className="form-control" placeholder="Search.."></input>
            <div className="input-group-append">
                <label onClick={setNextActiveWaypoint} className="btn btn-secondary" type="button"><i className="fa fa-search" aria-hidden="true"></i></label>
            </div>
        </div>
    )
}

export default SearchBar;
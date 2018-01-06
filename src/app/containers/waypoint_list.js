import React, {Component} from 'react';
import {connect} from 'react-redux';
import WaypointListItem from '../containers/waypoint_list_item';
import WaypointListItemActive from '../components/waypoint_list_item_active';

 class WaypointList extends Component {
    constructor(props) {
        super(props);

        this.renderWaypoint = this.renderWaypoint.bind(this);
    }

    renderWaypoint(waypoint) {
        const waypointId = waypoint.waypointId;
        const active = (waypoint === this.props.activeWaypoint);
        if (active) {
            return (
                <WaypointListItemActive key={waypointId} waypoint={waypoint} />
            )
        } else {
            return (
                <WaypointListItem key={waypointId} waypoint={waypoint} />
            )
        }
    }

    render() {
        return (
            <div>
                {this.props.waypoints.map(this.renderWaypoint)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        waypoints: state.waypoints,
        activeWaypoint: state.activeWaypoint
    }
}

export default connect(mapStateToProps)(WaypointList);
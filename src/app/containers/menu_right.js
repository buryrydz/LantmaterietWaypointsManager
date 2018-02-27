import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from '../components/search_bar';
import WaypointList from '../components/waypoint_list';

class MenuRight extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header p-1">
                    <SearchBar />
                </div>
                <div className="card-body p-1">
                    <WaypointList waypoints={this.props.waypoints} activeWaypoint={this.props.activeWaypoint} />
                </div>
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

export default connect(mapStateToProps)(MenuRight);
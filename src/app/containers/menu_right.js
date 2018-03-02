import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../actions/index';
import SearchBar from '../components/search_bar';
import WaypointList from '../components/waypoint_list';

class MenuRight extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('menu right')
        return (
            <div className="card">
                <div className="card-header p-1">
                    <SearchBar waypoints={this.props.waypoints} />
                </div>
                <div className="card-body p-1">
                    <WaypointList 
                        waypoints={this.props.waypoints} 
                        activeWaypoint={this.props.activeWaypoint} 
                        reduxActions={this.props.reduxActions} 
                    />
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

function mapDispatchToProps(dispatch) {
    return {reduxActions: bindActionCreators(reduxActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRight);
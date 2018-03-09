import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import * as waypointsActions from '../actions/waypoints_actions';
import * as uiActions from '../actions/ui_actions';
import * as modalActions from '../actions/modal_actions';
import SearchBar from '../components/search_bar';
import WaypointList from '../components/waypoint_list';

class MenuRight extends Component {
    constructor(props) {
        super(props);

        this.state = {searchTerm: ''};
        this.onSearchTermChanged = this.onSearchTermChanged.bind(this); 
    }

    onSearchTermChanged(searchTerm) {
        this.setState({searchTerm: searchTerm});
    }

    updatePresentationalWaypoints() {
        const presentationalWaypoints = (this.state.searchTerm === '') ? this.props.waypoints : this.props.waypoints.filter((waypoint) => {
            return (waypoint.waypointName.indexOf(this.state.searchTerm) > -1);
        });
        return presentationalWaypoints;
    }

    render() {
        const onSearchTermChanged = _.debounce(searchTerm => {
            this.onSearchTermChanged(searchTerm);
        }, 300);

        const presentationalWaypoints = this.updatePresentationalWaypoints();

        return (
            <div className="card">
                <div className="card-header p-1">
                    <SearchBar 
                        presentationalWaypoints={presentationalWaypoints} 
                        activeWaypoint={this.props.activeWaypoint} 
                        waypointsActions={this.props.waypointsActions} 
                        onSearchTermChanged={onSearchTermChanged} 
                    />
                </div>
                <div className="card-body p-1">
                    <WaypointList 
                        presentationalWaypoints={presentationalWaypoints} 
                        activeWaypoint={this.props.activeWaypoint} 
                        waypointsActions={this.props.waypointsActions} 
                        uiActions={this.props.uiActions}
                        modalActions={this.props.modalActions}
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
    return {
        waypointsActions: bindActionCreators(waypointsActions, dispatch), 
        uiActions: bindActionCreators(uiActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRight);
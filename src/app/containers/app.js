import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../actions/index';
import '../scss/style.scss';
import MenuUpper from '../components/menu_upper';
import Map from '../components/map';
import MenuRight from './menu_right';

class App extends Component {
    constructor(props) {
        super(props);

        this.uiActions = {
            enableAddWaypoint: () => {
                this.setState({addWaypointEnabled: true})
            },
            disableAddWaypoint: () => {
                this.setState({addWaypointEnabled: false})
            }
        };

        this.state = {
            addWaypointEnabled: false, 
            importWaypointsEnabled: false,
            exportWaypointsEnabled: false,
            clearWaypointsEnabled: false,
            changeWaypointNameEnabled: false,
            deleteWaypointEnabled: false
        };
    }

    render() {
        console.log('app')
        return (
            <div>
                <MenuUpper uiActions={this.uiActions} />
                <div className="row">
                    <div className="col-sm-9 p-0">
                        <Map 
                            uiState={this.state} 
                            activeWaypoint={this.props.activeWaypoint} 
                            uiActions={this.uiActions} 
                            reduxActions={this.props.reduxActions}
                        />
                    </div>
                    <div className="col-sm-3 p-0">
                        <MenuRight />
                    </div>
                </div>
            </div> 
        )
    }
}

function mapStateToProps(state) {
    return {
        // waypoints: state.waypoints,
        activeWaypoint: state.activeWaypoint
    }
}

function mapDispatchToProps(dispatch) {
    return {reduxActions: bindActionCreators(reduxActions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
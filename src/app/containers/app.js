import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWaypoints} from '../actions/index';
import {selectWaypoint} from '../actions/index';
import '../scss/style.scss';
import MenuUpper from '../components/menu_upper';
import Map from '../components/map';
import MenuRight from './menu_right';

class App extends Component {
    render() {
        return (
            <div>
                <MenuUpper />
                <div className="row">
                    <div className="col-sm-9 p-0">
                        <Map activeWaypoint={this.props.activeWaypoint} fetchWaypoints={this.props.fetchWaypoints} selectWaypoint={this.props.selectWaypoint} />
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
    return bindActionCreators({
        fetchWaypoints: fetchWaypoints, 
        selectWaypoint: selectWaypoint
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
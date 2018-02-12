import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectWaypoint} from '../actions/index';

class WaypointListItem extends Component {
    constructor(props) {
        super(props);
    } 
    
    render() {
        return (
            <div className="input-group p-1">
                <button
                    onClick={() => this.props.selectWaypoint(this.props.waypoint)} 
                    className="btn btn-light btn-block" 
                    type="button">
                        {this.props.waypoint.waypointName}
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectWaypoint}, dispatch);
}

export default connect(null, mapDispatchToProps)(WaypointListItem);
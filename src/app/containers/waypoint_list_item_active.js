import React, {Component} from 'react';
import {DELETE_WAYPOINT_MODAL_TYPE} from './modal';

class WaypointListItemActive extends Component {
    constructor(props) {
        super(props);

        this.state = {
            readOnly: true,
            waypointName: this.props.waypoint.waypointName
        };
    }

    startEditingWaypointName() {
        this.setState({readOnly: false});
    }

    endEditingWaypointName(e) {
        if (e.key == "Enter" && this.state.readOnly == false) {
            this.props.startChangeWaypointName(this.props.waypoint.waypointId, this.state.waypointName);
            this.setState({readOnly: true});
            return false
        }
    }

    render() {
        return (
            <div className="input-group justify-content-between p-1">
                <input type="text" 
                    onChange={(e) => {this.setState({waypointName: e.target.value})}}
                    onKeyPress={(e) => {this.endEditingWaypointName(e)}}
                    className="form-control" 
                    placeholder="waypoint's name" 
                    value={this.state.waypointName} 
                    readOnly={this.state.readOnly}>
                </input>
                <div className="input-group-append">
                    <label onClick={() => {this.startEditingWaypointName()}} className="btn btn-secondary" type="button">
                        <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </label>
                    <label onClick={() => {this.props.startShowModal(DELETE_WAYPOINT_MODAL_TYPE, {callback: this.props.startDeleteWaypoint, callbackData: [this.props.waypoint.waypointId]})}} className="btn btn-secondary" type="button">
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </label>
                    <label className="btn btn-secondary" type="button">
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </label>
                </div>
            </div>
        )
    }
}

export default WaypointListItemActive;  




import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import * as uiActions from '../actions/ui_actions';
import * as modalActions from '../actions/modal_actions';
import {CLEAR_WAYPOINTS_MODAL_TYPE} from './modal';

class MenuUpper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row">
                <nav className="col navbar navbar-dark bg-secondary">
                    <div>
                        <label className="btn btn-dark navbar-btn" data-toggle="tooltip" title="not yet">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </label>
                        <span className="navbar-brand d-none d-sm-inline-block ml-sm-2">
                            Lantmateriet<span className="font-weight-bold">Waypoints</span>Manager
                        </span>
                    </div>
                    <div>
                        <label onClick={this.props.uiActions.startDrawWaypoint} className="btn btn-dark navbar-btn mr-2 mr-sm-4" data-toggle="tooltip" title="add wpt">
                            <i className="fa fa-map-marker" aria-hidden="true"></i>
                        </label>
                        <label onClick={this.props.uiActions.startImportWaypoints} className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="import">
                            <i className="fa fa-upload" aria-hidden="true"></i>
                        </label>
                        <label onClick={this.props.uiActions.startExportWaypoints} className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="export">
                            <i className="fa fa-download" aria-hidden="true"></i>
                        </label>
                        <label onClick={() => {this.props.modalActions.startShowModal(CLEAR_WAYPOINTS_MODAL_TYPE, {callback: this.props.uiActions.startClearWaypoints, callbackData: []})}} className="btn btn-dark navbar-btn" data-toggle="tooltip" title="clear">
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                        </label>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uiActions: bindActionCreators(uiActions, dispatch),
        modalActions: bindActionCreators(modalActions, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(MenuUpper);
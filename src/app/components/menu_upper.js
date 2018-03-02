import React from 'react';

const MenuUpper = (props) => {
    return (
        <div className="row">
            <nav className="col navbar navbar-dark bg-secondary">
                <div>
                    <label className="btn btn-dark navbar-btn">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </label>
                    <span className="navbar-brand d-none d-sm-inline-block ml-sm-2">
                        Lantmateriet<span className="font-weight-bold">Waypoints</span>Manager
                    </span>
                </div>
                <div>
                    <label onClick={() => {props.uiActions.enableAddWaypoint()}} className="btn btn-dark navbar-btn mr-2 mr-sm-4" data-toggle="tooltip" title="add wpt">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </label>
                    <label className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="import">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </label>
                    <label className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="export">
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </label>
                    <label className="btn btn-dark navbar-btn" data-toggle="tooltip" title="clear">
                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </label>
                </div>
            </nav>
        </div>
    )
}

export default MenuUpper;
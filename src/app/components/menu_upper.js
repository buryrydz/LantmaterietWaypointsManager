import React from 'react';

export default () => {
    return (
        <div className="row">
            <nav className="col navbar navbar-dark bg-secondary">
                <div>
                    <button className="btn btn-dark navbar-btn">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </button>
                    <span className="navbar-brand d-none d-sm-inline-block ml-sm-2">
                        Lantmateriet<span className="font-weight-bold">Waypoints</span>Manager
                    </span>
                </div>
                <div>
                    <button className="btn btn-dark navbar-btn mr-2 mr-sm-4" data-toggle="tooltip" title="add wpt">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="import">
                        <i className="fa fa-upload" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-dark navbar-btn mr-sm-2" data-toggle="tooltip" title="export">
                        <i className="fa fa-download" aria-hidden="true"></i>
                    </button>
                    <button className="btn btn-dark navbar-btn" data-toggle="tooltip" title="clear">
                        <i className="fa fa-times-circle" aria-hidden="true"></i>
                    </button>
                </div>
            </nav>
        </div>
    )
}
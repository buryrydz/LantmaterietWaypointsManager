import React from 'react';

export default () => {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Search.."></input>
            <div className="input-group-append">
                <button className="btn btn-secondary" type="button"><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}
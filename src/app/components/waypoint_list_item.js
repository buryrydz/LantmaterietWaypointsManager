import React from 'react';

export default (props) => {
    return (
        <div className="input-group p-1">
            <button className="btn btn-light btn-block" type="button">{props.waypointName}</button>
        </div>
    )
}
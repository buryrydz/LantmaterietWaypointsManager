import React from 'react';
import Map from './map';
import MenuRight from './menu_right';

export default () => {
    return (
        <div className="row no-gutters">
            <div className="col-sm-9">
                <Map />
            </div>
            <div className="col-sm-3">
                <MenuRight />
            </div>
        </div>
    )
}
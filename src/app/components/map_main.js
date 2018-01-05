import React from 'react';
import Map from '../containers/map';
import MenuRight from './menu_right';

export default () => {
    return (
        <div className="row">
            <div className="col-sm-9 p-0">
                <Map />
            </div>
            <div className="col-sm-3 p-0">
                <MenuRight />
            </div>
        </div>
    )
}
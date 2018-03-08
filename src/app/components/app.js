import React from 'react';
import Map from '../containers/map';
import MenuUpper from '../containers/menu_upper';
import MenuRight from '../containers/menu_right';
import '../scss/style.scss';

const App = () => {
    return (
        <div>
            <MenuUpper />
            <div className="row">
                <div className="col-sm-9 p-0">
                    <Map />
                </div>
                <div className="col-sm-3 p-0">
                    <MenuRight />
                </div>
            </div>
        </div> 
    )
}

export default App;
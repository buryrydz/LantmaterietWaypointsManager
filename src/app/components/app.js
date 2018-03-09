import React from 'react';
import Map from '../containers/map';
import MenuUpper from '../containers/menu_upper';
import MenuRight from '../containers/menu_right';
import Modal from '../containers/modal';
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
            <Modal />
        </div> 
    );
}

export default App;
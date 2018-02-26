import React, {Component} from 'react';
import '../scss/style.scss';
import MenuUpper from '../components/menu_upper';
import Map from '../components/map';
import MenuRight from './menu_right';

export default class App extends Component {
    render() {
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
}
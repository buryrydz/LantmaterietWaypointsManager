import React, {Component} from 'react';
import '../scss/style.scss';
import MapMain from './map_main';
import MenuUpper from './menu_upper';

export default class App extends Component {
    render() {
        return (
            <div>
                <MenuUpper />
                <MapMain />
            </div> 
        )
    }
}
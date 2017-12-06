import React, {Component} from 'react';
import '../scss/style.scss';
import Map from './map';

export default class App extends Component {
    render() {
        return (
            <div>
                <Map />
            </div> 
        )
    }
}
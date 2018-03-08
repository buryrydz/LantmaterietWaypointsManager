import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Map from '../containers/map';
import MenuUpper from '../containers/menu_upper';
import MenuRight from '../containers/menu_right';
import Modal from '../containers/modal';
import '../scss/style.scss';

class App extends Component {
    componentDidMount() {
        // console.log(ReactDOM.findDOMNode(this.refs.modal))  // TO DO... UPRORZADKOWAC!!!
    }

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
                <Modal ref="modal" />
            </div> 
        );
    }
}

export default App;
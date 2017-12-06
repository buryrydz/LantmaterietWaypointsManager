import React, {Component} from 'react';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.name = 'marek';
        this.obj = {
            name: 'marek2',
        };
    }

    render() {
        console.log(this.obj.name);
        return (
            <div>{this.obj.name}</div>
        )
    }
}
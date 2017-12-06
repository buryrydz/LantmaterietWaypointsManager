import React, {Component} from 'react';
import '../scss/map.scss';

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        const extent = [ -1200000, 4700000, 2600000, 8500000 ];
        const resolutions = [ 4096.0, 2048.0, 1024.0, 512.0, 256.0, 128.0, 64.0, 32.0, 16.0, 8.0 ];
        const matrixIds = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

        const tileGrid = new ol.tilegrid.WMTS({
            tileSize : 256,
            extent : extent,
            resolutions : resolutions,
            matrixIds : matrixIds
        });

        //API key
        const apiKey = '61fa93cd3c7e51bc507628cd9b2a67';

        const wmts = new ol.layer.Tile({
            extent : extent,
            source : new ol.source.WMTS({
                url : 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/' + apiKey + '/',
                layer : 'topowebb',
                format : 'image/png',
                matrixSet : '3006',
                tileGrid : tileGrid,
                version : '1.0.0',
                style : 'default',
                crossOrigin: 'anonymous'
              })
        });

        const interactions = ol.interaction.defaults({
            altShiftDragRotate : false,
            pinchRotate : false
          });
          this.map = new ol.Map({
            target : 'map',
            layers : [ wmts ],
            logo : false,
            interactions : interactions,
            view : new ol.View({
                extent : extent,
                center : [ 616542, 6727536 ],
                zoom : 1,
                resolutions : resolutions
            })
          });
          const zoomslider = new ol.control.ZoomSlider();
          this.map.addControl(zoomslider);
    }

    render() {
        return (
            <div id="map" className="map"></div>
        )
    }
}
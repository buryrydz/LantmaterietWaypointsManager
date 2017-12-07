import React, {Component} from 'react';
import '../scss/map.scss';

proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +axis=neu +no_defs');

export default class Map extends Component {
    constructor(props) {
        super(props);

        // this.map = null;
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        const projection = ol.proj.get('EPSG:3006');
        const extent = [ -1200000, 4700000, 2600000, 8500000 ];
        const resolutions = [ 4096.0, 2048.0, 1024.0, 512.0, 256.0, 128.0, 64.0, 32.0, 16.0, 8.0, 4.0 ];
        const matrixIds = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

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

        const styleFunction = function(feature, resolution) {
            const featureStyleFunction = feature.getStyleFunction();
            if (featureStyleFunction) {
                return featureStyleFunction.call(feature, resolution);
            } else {
                return defaultStyle[feature.getGeometry().getType()];
            }
        };

        const dragAndDropInteraction = new ol.interaction.DragAndDrop({
            formatConstructors: [
                ol.format.GPX,
                ol.format.GeoJSON,
                ol.format.IGC,
                ol.format.KML,
                ol.format.TopoJSON
            ]
        });

        const interactions = ol.interaction.defaults({
            altShiftDragRotate : false,
            pinchRotate : false
        });

        const map = new ol.Map({
            target : 'map',
            layers : [ wmts ],
            logo : false,
            interactions : interactions.extend([dragAndDropInteraction]),
            view : new ol.View({
                projection: projection,
                extent : extent,
                center : [ 616542, 6727536 ],
                zoom : 1,
                resolutions : resolutions
            })
        });
        // this.map = map;
          
        const zoomslider = new ol.control.ZoomSlider();
        map.addControl(zoomslider);

        dragAndDropInteraction.on('addfeatures', function(event) {
            const vectorSource = new ol.source.Vector({
                features: event.features
            });
            map.addLayer(new ol.layer.Vector({
                source: vectorSource,
                style: styleFunction
            }));
            map.getView().fit(vectorSource.getExtent());
        });
    }

    render() {
        return (
            <div id="map" className="map"></div>
        )
    }
}
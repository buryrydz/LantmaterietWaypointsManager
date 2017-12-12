import React, {Component} from 'react';
import '../scss/map.scss';

// In order to work with EPSG:3006 coordinate reference system
proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +axis=neu +no_defs');

export default class Map extends Component {
    constructor(props) {
        super(props);
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
          
        const zoomslider = new ol.control.ZoomSlider();
        map.addControl(zoomslider);

        dragAndDropInteraction.on('addfeatures', function(event) {
            const vectorSource = new ol.source.Vector({
                features: event.features
            });
            const vectorLayer = new ol.layer.Vector({
                source: vectorSource
            }); 
            map.addLayer(vectorLayer);

            vectorSource.getFeatures().map(feature => {
                // console.log(feature.getProperties());
                const style = new ol.style.Style({
                    text: new ol.style.Text({
                        text: ""
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                          color: 'BlueViolet'
                        })
                      })
                });
                feature.setStyle(style);
            })
            // map.getView().fit(vectorSource.getExtent());
        });

        let highlight;
        const displayFeatureInfo = function(pixel) {
            const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
                return feature;
            });

            if (feature !== highlight) {
                if (highlight) {
                    const style = new ol.style.Style({
                        text: new ol.style.Text({
                            text: ""
                        }),
                        image: new ol.style.Circle({
                            radius: 2,
                            fill: new ol.style.Fill({
                              color: 'Blue'
                            })
                          })
                    });
                    highlight.setStyle(style);
                }
                if (feature) {
                    const style = new ol.style.Style({
                        text: new ol.style.Text({
                            font: '12px Calibri,sans-serif',
                            text: 'text',
                            fill: new ol.style.Fill({
                                color: '#000'
                            }),
                            stroke: new ol.style.Stroke({
                                color: '#f00',
                                width: 3
                            })
                        }),
                        image: new ol.style.Circle({
                            radius: 5,
                            fill: new ol.style.Fill({
                              color: 'Red'
                            })
                          })
                    });
                    feature.setStyle(style);
                }
                highlight = feature;
            }
        };
    
        map.on('pointermove', function(evt) {
            if (evt.dragging) {
                return;
            }
            const pixel = evt.pixel;
            displayFeatureInfo(pixel);
        });
    }

    render() {
        return (
            <div id="map" className="map"></div>
        )
    }
}
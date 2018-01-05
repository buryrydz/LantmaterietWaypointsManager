import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWaypoints} from '../actions/index';
import '../scss/map.scss';


// In order to work with EPSG:3006 coordinate reference system
proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +axis=neu +no_defs');

class Map extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {
        addFeatures = addFeatures.bind(this);

        const defaultFeatureName = 'wpt';
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

        // Create vector layer for waypoints
        const vectorSource = new ol.source.Vector({
        });
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource
        }); 

        // Create map
        const map = new ol.Map({
            target : 'map',
            layers : [ wmts, vectorLayer ],
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
          
        const zoomSlider = new ol.control.ZoomSlider();
        map.addControl(zoomSlider);

        const scaleLine = new ol.control.ScaleLine();
        map.addControl(scaleLine);

        function getFeatureDefaultStyle() {
            return new ol.style.Style({
                text: new ol.style.Text({
                    text: ""
                }),
                image: new ol.style.Icon({
                    // color: '#FFFFFF',
                    anchor: [18, 38],
                    anchorXUnits: 'pixels',
                    anchorYUnits: 'pixels',
                    scale: 1,
                    src: 'images/default.png'
                })
            });
        }

        function getFeatureSelectStyle(featureName) {
            return new ol.style.Style({
                text: new ol.style.Text({
                    font: '15px Calibri,sans-serif',
                    offsetX: 10,
                    offsetY: 0,
                    textAlign: 'left',
                    text: featureName,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#f00',
                        width: 2
                    })
                }),
                image: new ol.style.Icon({
                    color: '#CCCCCC',
                    anchor: [18, 38],
                    anchorXUnits: 'pixels',
                    anchorYUnits: 'pixels',
                    scale: 1,
                    src: 'images/default.png'
                })
            });
        }

        function getFeatureHighlightStyle(featureName) {
            return new ol.style.Style({
                text: new ol.style.Text({
                    font: '15px Calibri,sans-serif',
                    offsetX: 10,
                    offsetY: 0,
                    textAlign: 'left',
                    text: featureName,
                    fill: new ol.style.Fill({
                        color: '#fff'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#f00',
                        width: 2
                    })
                }),
                image: new ol.style.Icon({
                    // color: '#FFFFFF',
                    anchor: [18, 38],
                    anchorXUnits: 'pixels',
                    anchorYUnits: 'pixels',
                    scale: 1,
                    src: 'images/default.png'
                })
            });
        }

        function getFeatureEmptyStyle() {
            return [];
        }

        dragAndDropInteraction.on('addfeatures', function(event) {
            addFeatures(event.features);
        });

        // Add additional interactions   
        const selectInteraction = new ol.interaction.Select({
            toggleCondition: ol.events.condition.never
        });
        map.addInteraction(selectInteraction);

        selectInteraction.on('select', function(event) {
            if(event.selected.length > 0) {
                event.selected[0].setStyle(getFeatureSelectStyle(event.selected[0].get('name')));
            }
            if(event.deselected.length > 0) {
                event.deselected[0].setStyle(getFeatureDefaultStyle());
            }
        });

        const translateInteraction = new ol.interaction.Translate({
            features: selectInteraction.getFeatures(),
            style: getFeatureEmptyStyle()
        });
        map.addInteraction(translateInteraction);

        const drawInteraction = new ol.interaction.Draw({
            source: vectorSource,
            type: 'Point',
            stopClick: true
        });
        map.addInteraction(drawInteraction);

        drawInteraction.on('drawend', function(event) {
            enableAddFeature(false);
            const feature = event.feature;
            const featureId = createFeatureId();
            feature.setId(featureId);
            feature.set('name', defaultFeatureName);
            // TO DO... powiadom inne komponenty ze dodano nowy waypoint,
            // przekaz Id oraz nazwe nowego waypointa(?)
        });

        const snapInteraction = new ol.interaction.Snap({source: vectorSource});
        map.addInteraction(snapInteraction);

        // Highlight waypoints 
        let highlight;
        function displayFeatureInfo(feature) {
            if (feature !== highlight) {
                const featureSelected = getFeatureSelected();
                if (highlight && (highlight !== featureSelected)) {
                    highlight.setStyle(getFeatureDefaultStyle());
                }
                if (feature) {
                    feature.setStyle(getFeatureHighlightStyle(feature.get('name')));
                }
                highlight = feature;
            }
        }
    
        function getFeatureIndicated(pixel) {
            const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
                return feature;
            });
            return feature;
        }

        function getFeatureSelected() {
            return selectInteraction.getFeatures().item(0);
        }

        map.on('pointermove', function(evt) {
            if (evt.dragging) {
                return;
            }
            const pixel = evt.pixel;
            const featureSelected = getFeatureSelected();
            const featureIndicated = getFeatureIndicated(pixel);
            const isFeatureSelectedIndicated = (featureSelected && featureIndicated && (featureSelected == featureIndicated)) 
                ? true : false; 
            const isAnyFeatureSelected = (selectInteraction.getFeatures().getLength() > 0)
                ? true : false;
            if (!isAnyFeatureSelected || !isFeatureSelectedIndicated){
                displayFeatureInfo(featureIndicated); 
            }
            map.getTargetElement().style.cursor = featureIndicated ? 'pointer' : '';
        });

        function importFeatures(data) {
            const format = new ol.format.KML();
            const features = format.readFeatures(data, {featureProjection: map.getView().getProjection()});
            addFeatures(features);
        }

        function getKMLFromFeatures(features) {
            const format = new ol.format.KML();
            const kml = format.writeFeatures(features, {featureProjection: map.getView().getProjection()});
            return kml;
        }
        function getGeoJSONFromFeatures(features) {
            const format = new ol.format.GeoJSON();
            const geoJSON = format.writeFeaturesObject(features, {featureProjection: map.getView().getProjection()});
            return geoJSON;
        }
        function getFeaturesFromLayer(layer) {
            const source = layer.getSource();
            const features = source.getFeatures();
            return features;
        }

        function exportFeaturesToKml(vectorLayer) {
            const geojsonObject = getGeoJSONFromFeatures(getFeaturesFromLayer(vectorLayer));
            const kml = tokml(geojsonObject);
            const blob = new Blob([kml], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "waypoints"+".kml");
        }

        function clearFeatures(vectorLayer) {
            const source = vectorLayer.getSource();
            source.clear(true);
        }

        let autoFeatureId = 0;
        function createFeatureId() {
            try {
                let id = autoFeatureId;
                autoFeatureId++;
                if (autoFeatureId > Number.MAX_SAFE_INTEGER) {
                    throw new RangeError('Maximum number of feature id exceeded!');
                }
                return id;
            }
            catch(e) {
                if (e instanceof RangeError) {
                    console.log(e.message);
                }
            }
        }

        function addFeatures(features) {
            const waypointsCache = [];
            vectorSource.addFeatures(features);
            features.map(feature => {
                const featureId = createFeatureId();
                const featureName = feature.get('name');
                // add other waypoint properties here
                const waypoint = {
                    waypointId: featureId, 
                    waypointName: featureName
                };
                waypointsCache.push(waypoint);
                feature.setId(featureId);
                feature.setStyle(getFeatureDefaultStyle());
            })
            this.props.fetchWaypoints(waypointsCache);
            map.getView().fit(vectorSource.getExtent());
        }

        function selectFeature(featureId) {
            const featureToSelect = vectorSource.getFeatureById(featureId);
            const featureSelected = getFeatureSelected(); 
            const canDeselect = featureSelected && (featureSelected !== featureToSelect);
            selectInteraction.getFeatures().clear();
            selectInteraction.getFeatures().push(featureToSelect);
            selectInteraction.dispatchEvent({
                type: 'select',
                selected: [featureToSelect],
                deselected: canDeselect ? [featureSelected] : []
            });
            map.getView().animate({
                center: featureToSelect.getGeometry().getCoordinates(),
                duration: 1000
            });
        }

        function deselectFeature(featureId) {
            const featureToDeselect = vectorSource.getFeatureById(featureId);
            const featureSelected = getFeatureSelected(); 
            if (featureSelected && (featureSelected === featureToDeselect)) {
                selectInteraction.getFeatures().clear();
                selectInteraction.dispatchEvent({
                    type: 'select',
                    selected: [],
                    deselected: [featureToDeselect]
                });
            }
        }

        function changeFeatureName(featureId, featureName) {
            const feature = vectorSource.getFeatureById(featureId);
            const featureSelected = getFeatureSelected();
            feature.set('name', featureName);
            if (feature === featureSelected) {
                feature.setStyle(getFeatureSelectStyle(featureName));
            }
        }

        function deleteFeature(featureId) {
            const feature = vectorSource.getFeatureById(featureId); 
            vectorSource.removeFeature(feature);
            feature.setStyle(getFeatureEmptyStyle());
        }

        function enableAddFeature(enable) {
            drawInteraction.setActive(enable);
        }

        enableAddFeature(false);

        $(document).keypress(function(e) {
            if(e.which == 13) {
                // enableAddFeature(true);

                // ***FILE CHOOSER CODE***
                const fileInput = document.getElementById('file-input');
                fileInput.addEventListener("change", handleFiles, false);
                function handleFiles(){
                    // const fileInput = document.getElementById('file-input');
                    const filePath = this.value;
                    const allowedExtensions = /(\.kml)$/i;
                    if(!allowedExtensions.exec(filePath)){
                        alert('Please upload file having extension .kml only');
                        this.value = '';
                        return false;
                    }else{
                        if (this.files && this.files[0]) {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const dataURL = reader.result;
                                importFeatures(dataURL);
                            };
                            reader.readAsText(this.files[0]);
                        }
                    }
                }
                fileInput.click();
                // ***END OF FILE CHOOSER CODE***
            } 
            else if(e.which == 32) {
                console.log(getFeatureSelected().getId());
                // console.log(vectorSource.getFeatures().length);
            }        
        });
    }

    render() {
        //selectFeature

        return (
            <div id="map" className="map"></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeWaypoint: state.activeWaypoint
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchWaypoints}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);

// TO DO...
// enableAddFeature DONE
// importFeatures DONE
// exportFeatures DONE
// clearFeatures DONE
// selectFeature DONE
// changeFeatureName DONE
// deleteFeature DONE
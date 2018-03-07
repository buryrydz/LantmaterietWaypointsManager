import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as waypointsActions from '../actions/waypoints_actions';
import * as uiActions from '../actions/ui_actions';
import '../scss/map.scss';

// In order to work with EPSG:3006 coordinate reference system
proj4.defs('EPSG:3006', '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +axis=neu +no_defs');

class Map extends Component {
    constructor(props) {
        super(props);
    }

    createMapManager() {
        let isSelectedFeatureChosenUsingMap = false;
        const fileInput = document.getElementById('file-input');
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

        const vectorSource = new ol.source.Vector({
        });
        const vectorLayer = new ol.layer.Vector({
            source: vectorSource
        }); 

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
        const scaleLine = new ol.control.ScaleLine();

        const getFeatureDefaultStyle = function() {
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
        };

        const getFeatureSelectStyle = function(featureName) {
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
        };

        const getFeatureHighlightStyle = function(featureName) {
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
        };

        const getFeatureEmptyStyle = function() {
            return [];
        };

        const selectInteraction = new ol.interaction.Select({
            toggleCondition: ol.events.condition.never
        });

        const translateInteraction = new ol.interaction.Translate({
            features: selectInteraction.getFeatures(),
            style: getFeatureEmptyStyle()
        });

        const drawInteraction = new ol.interaction.Draw({
            source: vectorSource,
            type: 'Point',
            stopClick: true
        });

        const snapInteraction = new ol.interaction.Snap({
            source: vectorSource
        });

        const parentComponent = this;

        return {
            init: function() {
                map.addControl(zoomSlider);
                map.addControl(scaleLine);
    
                dragAndDropInteraction.on('addfeatures', function(event) {
                    this.addFeatures(event.features);
                }.bind(this));

                map.addInteraction(selectInteraction);
                selectInteraction.on('select', function(event) {
                    const isSelected = (event.selected.length > 0) ? true : false;
                    const isDeselected = (event.deselected.length > 0) ? true : false;
                    const featureSelected = isSelected ? event.selected[0] : null;
                    const featureDeselected = isDeselected ? event.deselected[0] : null;
                    if(isSelected && !isDeselected) {
                        isSelectedFeatureChosenUsingMap = true;
                        const featureSelectedId = featureSelected.getId();
                        const featureSelectedName = featureSelected.get('name');
                        parentComponent.props.waypointsActions.selectWaypoint(this.getWaypointFromFeatureData(featureSelectedId, featureSelectedName));
                    } else if(isSelected && isDeselected) {
                        isSelectedFeatureChosenUsingMap = true;
                        const featureSelectedId = featureSelected.getId();
                        const featureSelectedName = featureSelected.get('name');
                        parentComponent.props.waypointsActions.selectWaypoint(this.getWaypointFromFeatureData(featureSelectedId, featureSelectedName));
                    } else if(!isSelected && isDeselected) {
                        parentComponent.props.waypointsActions.selectWaypoint(null);
                    }
                }.bind(this));

                map.addInteraction(translateInteraction);

                map.addInteraction(drawInteraction);
                drawInteraction.on('drawend', function(event) {
                    const feature = event.feature;
                    const featureId = this.createFeatureId();
                    const featureName = defaultFeatureName;
                    feature.setId(featureId);
                    feature.set('name', featureName);
                    parentComponent.props.uiActions.endDrawWaypoint(this.getWaypointFromFeatureData(featureId, featureName));
                }.bind(this));

                // map.addInteraction(snapInteraction);

                map.on('pointermove', function(event) {
                    if (event.dragging) {
                        return;
                    }
                    const featureIndicated = this.getFeatureIndicated(event.pixel);
                    this.displayFeatureInfo(featureIndicated); 
                    map.getTargetElement().style.cursor = featureIndicated ? 'pointer' : '';
                }.bind(this));

                this.enableAddFeature(false);

                const mapManager = this;
                fileInput.addEventListener("change", handleFiles, false);
                function handleFiles(){
                    // const fileInput = document.getElementById('file-input');
                    const filePath = this.value;
                    const allowedExtensions = /(\.kml)$/i;
                    if(!allowedExtensions.exec(filePath)){
                        alert('Please upload file having extension .kml only');
                        this.value = '';
                        return false;
                    } else{
                        if (this.files && this.files[0]) {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                const dataURL = reader.result;
                                mapManager.importFeatures(dataURL);
                            };
                            reader.readAsText(this.files[0]);
                        }
                    }
                }

                // $(document).keypress(function(e) {
                //     if(e.which == 13) {

                //     }       
                // }.bind(this));
                
                delete parentComponent.createMapManager;
                return this;
            },
    
            readKmlFile: function() {
                parentComponent.props.uiActions.endImportWaypoints();
                fileInput.click();
            },

            displayFeatureInfo: function() {
                let highlight;
                return function(featureIndicated) {
                    const featureSelected = this.getFeatureSelected();
                    const isFeatureSelectedIndicated = (featureSelected && featureIndicated && (featureSelected == featureIndicated)) 
                        ? true : false; 
                    const isAnyFeatureSelected = (selectInteraction.getFeatures().getLength() > 0)
                        ? true : false;
                    if (!isAnyFeatureSelected || !isFeatureSelectedIndicated){
                        if (featureIndicated !== highlight) {
                            if (highlight && (highlight !== featureSelected)) {
                                highlight.setStyle(getFeatureDefaultStyle());
                            }
                            if (featureIndicated) {
                                featureIndicated.setStyle(getFeatureHighlightStyle(featureIndicated.get('name')));
                            }
                            highlight = featureIndicated;
                        }
                    }
                }
            }(),
        
            getFeatureIndicated: function(pixel) {
                const feature = map.forEachFeatureAtPixel(pixel, function (feature) {
                    return feature;
                });
                return feature;
            },
    
            getFeatureSelected: function() {
                return selectInteraction.getFeatures().item(0);
            },
    
            importFeatures: function(data) {
                const format = new ol.format.KML();
                const features = format.readFeatures(data, {featureProjection: map.getView().getProjection()});
                this.addFeatures(features);
            },
    
            getKMLFromFeatures: function(features) {
                const format = new ol.format.KML();
                const kml = format.writeFeatures(features, {featureProjection: map.getView().getProjection()});
                return kml;
            },
            getGeoJSONFromFeatures: function(features) {
                const format = new ol.format.GeoJSON();
                const geoJSON = format.writeFeaturesObject(features, {featureProjection: map.getView().getProjection()});
                return geoJSON;
            },
            getFeaturesFromLayer: function(layer) {
                const source = layer.getSource();
                const features = source.getFeatures();
                return features;
            },
    
            exportFeaturesToKml: function() {
                const geojsonObject = this.getGeoJSONFromFeatures(this.getFeaturesFromLayer(vectorLayer));
                const kml = tokml(geojsonObject);
                const blob = new Blob([kml], {type: "text/plain;charset=utf-8"});
                saveAs(blob, "waypoints"+".kml");
                parentComponent.props.uiActions.endExportWaypoints();
            },
    
            clearFeatures: function() {
                const source = vectorLayer.getSource();
                source.clear(true);
                if (selectInteraction) {
                    selectInteraction.getFeatures().clear();
                }
                parentComponent.props.uiActions.endClearWaypoints();
            },
    
            createFeatureId: function() {
                let autoFeatureId = 0;
                return function() {
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
            }(),
    
            getWaypointFromFeatureData: function(featureId, featureName) {
                return {
                    waypointId: featureId, 
                    waypointName: featureName
                }
            },

            addFeatures: function(features) {
                const waypointsCache = [];
                vectorSource.addFeatures(features);
                features.map(feature => {
                    const featureId = this.createFeatureId();
                    const featureName = feature.get('name');
                    waypointsCache.push(this.getWaypointFromFeatureData(featureId, featureName));
                    feature.setId(featureId);
                    feature.setStyle(getFeatureDefaultStyle());
                })
                parentComponent.props.waypointsActions.fetchWaypoints(waypointsCache);
                map.getView().fit(vectorSource.getExtent());
            },
    
            selectFeature: function(featureId) {
                const featureToSelect = vectorSource.getFeatureById(featureId);
                selectInteraction.getFeatures().clear();
                selectInteraction.getFeatures().push(featureToSelect);
            },
    
            // deselectFeature: function(featureId) {
            //     const featureToDeselect = vectorSource.getFeatureById(featureId);
            //     const featureSelected = this.getFeatureSelected(); 
            //     if (featureSelected && (featureSelected === featureToDeselect)) {
            //         selectInteraction.getFeatures().clear();
            //         selectInteraction.dispatchEvent({
            //             type: 'select',
            //             selected: [],
            //             deselected: [featureToDeselect]
            //         });
            //     }
            // },

            panToFeature: function(featureId) {
                map.getView().animate({
                    center: vectorSource.getFeatureById(featureId).getGeometry().getCoordinates(),
                    duration: 1000
                });
            },
    
            changeFeatureName: function(featureId, featureName) {
                const feature = vectorSource.getFeatureById(featureId);
                const featureSelected = this.getFeatureSelected();
                feature.set('name', featureName);
                if (feature === featureSelected) {
                    feature.setStyle(getFeatureSelectStyle(featureName));
                }
                parentComponent.props.uiActions.endChangeWaypointName(featureId, featureName);
            },
    
            deleteFeature: function(featureId) {
                const feature = vectorSource.getFeatureById(featureId); 
                vectorSource.removeFeature(feature);
                feature.setStyle(getFeatureEmptyStyle());
                parentComponent.props.uiActions.endDeleteWaypoint(featureId);
            },
    
            enableAddFeature: function(enable) {
                drawInteraction.setActive(enable);
            },

            getIsSelectedFeatureChosenUsingMap: function() {
                return isSelectedFeatureChosenUsingMap;
            },

            setIsSelectedFeatureChosenUsingMap: function(selectedUsingMap) {
                isSelectedFeatureChosenUsingMap = selectedUsingMap;
            },

            setFeatureStyleToSelected: function(featureId) {
                const feature = vectorSource.getFeatureById(featureId); 
                if (feature) {
                    feature.setStyle(getFeatureSelectStyle(feature.get('name')));
                }
            },

            setFeatureStyleToDeselected: function(featureId) {
                const feature = vectorSource.getFeatureById(featureId); 
                if (feature) {
                    feature.setStyle(getFeatureDefaultStyle());
                }
            }
        }
    }

    componentDidMount() {
        this.mapManager = this.createMapManager().init();
    }

    componentDidUpdate(prevProps, prevState) {
        const mapManager = this.mapManager;

        // handle selection
        const activeWaypoint = this.props.activeWaypoint;
        const prevActiveWaypoint = prevProps.activeWaypoint;
        const activeWaypointId = activeWaypoint ? activeWaypoint.waypointId : -1;
        const prevActiveWaypointId = prevActiveWaypoint ? prevActiveWaypoint.waypointId : -1;
        if (activeWaypointId != prevActiveWaypointId) {
            if (activeWaypoint) {
                if (!mapManager.getIsSelectedFeatureChosenUsingMap()) {
                    mapManager.selectFeature(activeWaypoint.waypointId);
                    mapManager.panToFeature(activeWaypoint.waypointId)
                }
                mapManager.setIsSelectedFeatureChosenUsingMap(false);

                mapManager.setFeatureStyleToSelected(activeWaypoint.waypointId);
                if (prevActiveWaypoint) {
                    mapManager.setFeatureStyleToDeselected(prevActiveWaypoint.waypointId);
                }
            } else if (!activeWaypoint && prevActiveWaypoint) {
                mapManager.setFeatureStyleToDeselected(prevActiveWaypoint.waypointId);
            }
        }

        // handle add waypoint
        const addWaypointEnabled = this.props.uiState.addWaypointEnabled;
        const prevAddWaypointEnabled = prevProps.uiState.addWaypointEnabled;
        if (addWaypointEnabled != prevAddWaypointEnabled) {
            if (addWaypointEnabled) {
                mapManager.enableAddFeature(true);
            } else {
                mapManager.enableAddFeature(false);
            }
        }

        // handle import waypoints
        const importWaypointsEnabled = this.props.uiState.importWaypointsEnabled;
        const prevImportWaypointsEnabled = prevProps.uiState.importWaypointsEnabled;
        if (importWaypointsEnabled != prevImportWaypointsEnabled) {
            if (importWaypointsEnabled) {
                mapManager.readKmlFile();
            }
        }

        // handle export waypoints
        const exportWaypointsEnabled = this.props.uiState.exportWaypointsEnabled;
        const prevExportWaypointsEnabled = prevProps.uiState.exportWaypointsEnabled;
        if (exportWaypointsEnabled != prevExportWaypointsEnabled) {
            if (exportWaypointsEnabled) {
                mapManager.exportFeaturesToKml();
            }
        }

        // handle clear waypoints
        const clearWaypointsEnabled = this.props.uiState.clearWaypointsEnabled;
        const prevClearWaypointsEnabled = prevProps.uiState.clearWaypointsEnabled;
        if (clearWaypointsEnabled != prevClearWaypointsEnabled) {
            if (clearWaypointsEnabled) {
                mapManager.clearFeatures();
            }
        }

        // handle change waypoint name
        const changeWaypointNameEnabled = this.props.uiState.changeWaypointNameEnabled;
        const prevChangeWaypointNameEnabled = prevProps.uiState.changeWaypointNameEnabled;
        if (changeWaypointNameEnabled != prevChangeWaypointNameEnabled) {
            if (changeWaypointNameEnabled) {
                mapManager.changeFeatureName(this.props.uiState.changedWaypointId, this.props.uiState.changedWaypointNewName);
            }
        }

        // handle delete waypoint
        const deleteWaypointEnabled = this.props.uiState.deleteWaypointEnabled;
        const prevDeleteWaypointEnabled = prevProps.uiState.deleteWaypointEnabled;
        if (deleteWaypointEnabled != prevDeleteWaypointEnabled) {
            if (deleteWaypointEnabled) {
                mapManager.deleteFeature(this.props.uiState.deletedWaypointId)
            }
        }
    }

    render() {
        return (
            <div id="map" className="map"></div>
        )
    }
}

function mapStateToProps(state) {
    return {
        // waypoints: state.waypoints,
        activeWaypoint: state.activeWaypoint,
        uiState: state.uiState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        waypointsActions: bindActionCreators(waypointsActions, dispatch),
        uiActions: bindActionCreators(uiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);


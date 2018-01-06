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
        // this.mapManager.parent = this; A MOZE MOZNA UZYC Map?
        this.mapManager = function() {
            const defaultFeatureName = 'wpt';
            const projection = ol.proj.get('EPSG:3006');
            const extent = [ -1200000, 4700000, 2600000, 8500000 ];
            const resolutions = [ 4096.0, 2048.0, 1024.0, 512.0, 256.0, 128.0, 64.0, 32.0, 16.0, 8.0, 4.0 ];
            const matrixIds = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    
            const tileGrid = new ol.tilegrid.WMTS({
                tileSize: 256,
                extent: extent,
                resolutions: resolutions,
                matrixIds: matrixIds
            });
    
            //API key
            const apiKey = '61fa93cd3c7e51bc507628cd9b2a67';
    
            const wmts = new ol.layer.Tile({
                extent: extent,
                source: new ol.source.WMTS({
                    url: 'https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/' + apiKey + '/',
                    layer: 'topowebb',
                    format: 'image/png',
                    matrixSet: '3006',
                    tileGrid: tileGrid,
                    version: '1.0.0',
                    style: 'default',
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
                target: 'map',
                layers: [ wmts, vectorLayer ],
                logo: false,
                interactions: interactions.extend([dragAndDropInteraction]),
                view: new ol.View({
                    projection: projection,
                    extent: extent,
                    center: [ 616542, 6727536 ],
                    zoom: 1,
                    resolutions: resolutions
                })
            });
              
            // zoomSlider: new ol.control.ZoomSlider(),
            // scaleLine: new ol.control.ScaleLine(),
          
            // // Additional interactions   
            // selectInteraction: new ol.interaction.Select({
            //     toggleCondition: ol.events.condition.never
            // }),
    
            // translateInteraction: new ol.interaction.Translate({
            //     features: this.selectInteraction.getFeatures(),
            //     style: this.getFeatureEmptyStyle()
            // }),
    
            // drawInteraction: new ol.interaction.Draw({
            //     source: this.vectorSource,
            //     type: 'Point',
            //     stopClick: true
            // }),
    
            // snapInteraction: new ol.interaction.Snap({
            //     source: this.vectorSource
            // }),

            // init: function() {
            //     this.map.addControl(this.zoomSlider);
            //     this.map.addControl(this.scaleLine);

            //     this.dragAndDropInteraction.on('addfeatures', function(event) {
            //         this.addFeatures(event.features);
            //     });

            //     this.map.addInteraction(this.selectInteraction);
            //     this.selectInteraction.on('select', function(event) {
            //         if(event.selected.length > 0) {
            //             event.selected[0].setStyle(this.getFeatureSelectStyle(event.selected[0].get('name')));
            //         }
            //         if(event.deselected.length > 0) {
            //             event.deselected[0].setStyle(this.getFeatureDefaultStyle());
            //         }
            //     });

            //     this.map.addInteraction(this.translateInteraction);

            //     this.map.addInteraction(this.drawInteraction);
            //     this.drawInteraction.on('drawend', function(event) {
            //         this.enableAddFeature(false);
            //         const feature = event.feature;
            //         const featureId = this.createFeatureId();
            //         feature.setId(featureId);
            //         feature.set('name', this.defaultFeatureName);
            //         // TO DO... powiadom inne komponenty ze dodano nowy waypoint,
            //         // przekaz Id oraz nazwe nowego waypointa(?)
            //     });

            //     this.map.addInteraction(this.snapInteraction);

            //     this.map.on('pointermove', function(event) {
            //         if (event.dragging) {
            //             return;
            //         }
            //         const pixel = event.pixel;
            //         const featureSelected = this.getFeatureSelected();
            //         const featureIndicated = this.getFeatureIndicated(pixel);
            //         const isFeatureSelectedIndicated = (featureSelected && featureIndicated && (featureSelected == featureIndicated)) 
            //             ? true : false; 
            //         const isAnyFeatureSelected = (this.selectInteraction.getFeatures().getLength() > 0)
            //             ? true : false;
            //         if (!isAnyFeatureSelected || !isFeatureSelectedIndicated){
            //             this.displayFeatureInfo(featureIndicated); 
            //         }
            //         this.map.getTargetElement().style.cursor = featureIndicated ? 'pointer' : '';
            //     });

            //     this.enableAddFeature(false);

            //     $(document).keypress(function(e) {
            //         if(e.which == 13) {
            //             // this.enableAddFeature(true);
        
            //             // // ***FILE CHOOSER CODE***
            //             // const fileInput = document.getElementById('file-input');
            //             // fileInput.addEventListener("change", handleFiles, false);
            //             // function handleFiles(){
            //             //     // const fileInput = document.getElementById('file-input');
            //             //     const filePath = this.value;
            //             //     const allowedExtensions = /(\.kml)$/i;
            //             //     if(!allowedExtensions.exec(filePath)){
            //             //         alert('Please upload file having extension .kml only');
            //             //         this.value = '';
            //             //         return false;
            //             //     }else{
            //             //         if (this.files && this.files[0]) {
            //             //             const reader = new FileReader();
            //             //             reader.onload = function(event) {
            //             //                 const dataURL = reader.result;
            //             //                 this.importFeatures(dataURL);
            //             //             };
            //             //             reader.readAsText(this.files[0]);
            //             //         }
            //             //     }
            //             // }
            //             // fileInput.click();
            //             // // ***END OF FILE CHOOSER CODE***
            //         } 
            //         else if(e.which == 32) {
            //             console.log(this.getFeatureSelected().getId());
            //             // console.log(this.vectorSource.getFeatures().length);
            //         }        
            //     });
            // },

            // getFeatureDefaultStyle: function() {
            //     return new ol.style.Style({
            //         text: new ol.style.Text({
            //             text: ""
            //         }),
            //         image: new ol.style.Icon({
            //             // color: '#FFFFFF',
            //             anchor: [18, 38],
            //             anchorXUnits: 'pixels',
            //             anchorYUnits: 'pixels',
            //             scale: 1,
            //             src: 'images/default.png'
            //         })
            //     });
            // },
    
            // getFeatureSelectStyle: function(featureName) {
            //     return new ol.style.Style({
            //         text: new ol.style.Text({
            //             font: '15px Calibri,sans-serif',
            //             offsetX: 10,
            //             offsetY: 0,
            //             textAlign: 'left',
            //             text: featureName,
            //             fill: new ol.style.Fill({
            //                 color: '#fff'
            //             }),
            //             stroke: new ol.style.Stroke({
            //                 color: '#f00',
            //                 width: 2
            //             })
            //         }),
            //         image: new ol.style.Icon({
            //             color: '#CCCCCC',
            //             anchor: [18, 38],
            //             anchorXUnits: 'pixels',
            //             anchorYUnits: 'pixels',
            //             scale: 1,
            //             src: 'images/default.png'
            //         })
            //     });
            // },
    
            // getFeatureHighlightStyle: function(featureName) {
            //     return new ol.style.Style({
            //         text: new ol.style.Text({
            //             font: '15px Calibri,sans-serif',
            //             offsetX: 10,
            //             offsetY: 0,
            //             textAlign: 'left',
            //             text: featureName,
            //             fill: new ol.style.Fill({
            //                 color: '#fff'
            //             }),
            //             stroke: new ol.style.Stroke({
            //                 color: '#f00',
            //                 width: 2
            //             })
            //         }),
            //         image: new ol.style.Icon({
            //             // color: '#FFFFFF',
            //             anchor: [18, 38],
            //             anchorXUnits: 'pixels',
            //             anchorYUnits: 'pixels',
            //             scale: 1,
            //             src: 'images/default.png'
            //         })
            //     });
            // },
    
            // getFeatureEmptyStyle: function() {
            //     return [];
            // },
    
            // // Highlight waypoints 
            // displayFeatureInfo: function() {
            //     let highlight;
            //     return function(feature) {
            //         if (feature !== highlight) {
            //             const featureSelected = this.getFeatureSelected();
            //             if (highlight && (highlight !== featureSelected)) {
            //                 highlight.setStyle(this.getFeatureDefaultStyle());
            //             }
            //             if (feature) {
            //                 feature.setStyle(this.getFeatureHighlightStyle(feature.get('name')));
            //             }
            //             highlight = feature;
            //         }
            //     }
            // }(),
        
            // getFeatureIndicated: function(pixel) {
            //     const feature = this.map.forEachFeatureAtPixel(pixel, function (feature) {
            //         return feature;
            //     });
            //     return feature;
            // },
    
            // getFeatureSelected: function() {
            //     return this.selectInteraction.getFeatures().item(0);
            // },
    
            // importFeatures: function(data) {
            //     const format = new ol.format.KML();
            //     const features = format.readFeatures(data, {featureProjection: this.map.getView().getProjection()});
            //     this.addFeatures(features);
            // },
    
            // getKMLFromFeatures: function(features) {
            //     const format = new ol.format.KML();
            //     const kml = format.writeFeatures(features, {featureProjection: this.map.getView().getProjection()});
            //     return kml;
            // },
            // getGeoJSONFromFeatures: function(features) {
            //     const format = new ol.format.GeoJSON();
            //     const geoJSON = format.writeFeaturesObject(features, {featureProjection: this.map.getView().getProjection()});
            //     return geoJSON;
            // },
            // getFeaturesFromLayer: function(layer) {
            //     const source = layer.getSource();
            //     const features = source.getFeatures();
            //     return features;
            // },
    
            // exportFeaturesToKml: function(vectorLayer) {
            //     const geojsonObject = this.getGeoJSONFromFeatures(this.getFeaturesFromLayer(vectorLayer));
            //     const kml = tokml(geojsonObject);
            //     const blob = new Blob([kml], {type: "text/plain;charset=utf-8"});
            //     saveAs(blob, "waypoints"+".kml");
            // },
    
            // clearFeatures: function(vectorLayer) {
            //     const source = vectorLayer.getSource();
            //     source.clear(true);
            // },
    
            // createFeatureId: function() {
            //     let autoFeatureId = 0;
            //     return function() {
            //         try {
            //             let id = autoFeatureId;
            //             autoFeatureId++;
            //             if (autoFeatureId > Number.MAX_SAFE_INTEGER) {
            //                 throw new RangeError('Maximum number of feature id exceeded!');
            //             }
            //             return id;
            //         }
            //         catch(e) {
            //             if (e instanceof RangeError) {
            //                 console.log(e.message);
            //             }
            //         }
            //     }
            // }(),
    
            // addFeatures: function(features) {
            //     const waypointsCache = [];
            //     this.vectorSource.addFeatures(features);
            //     features.map(feature => {
            //         const featureId = this.createFeatureId();
            //         const featureName = feature.get('name');
            //         // add other waypoint properties here
            //         const waypoint = {
            //             waypointId: featureId, 
            //             waypointName: featureName
            //         };
            //         waypointsCache.push(waypoint);
            //         feature.setId(featureId);
            //         feature.setStyle(this.getFeatureDefaultStyle());
            //     })
            //     // this.props.fetchWaypoints(waypointsCache);
            //     this.map.getView().fit(this.vectorSource.getExtent());
            // },
    
            // selectFeature: function(featureId) {
            //     const featureToSelect = this.vectorSource.getFeatureById(featureId);
            //     const featureSelected = this.getFeatureSelected(); 
            //     const canDeselect = featureSelected && (featureSelected !== featureToSelect);
            //     this.selectInteraction.getFeatures().clear();
            //     this.selectInteraction.getFeatures().push(featureToSelect);
            //     this.selectInteraction.dispatchEvent({
            //         type: 'select',
            //         selected: [featureToSelect],
            //         deselected: canDeselect ? [featureSelected] : []
            //     });
            //     this.map.getView().animate({
            //         center: featureToSelect.getGeometry().getCoordinates(),
            //         duration: 1000
            //     });
            // },
    
            // deselectFeature: function(featureId) {
            //     const featureToDeselect = this.vectorSource.getFeatureById(featureId);
            //     const featureSelected = this.getFeatureSelected(); 
            //     if (featureSelected && (featureSelected === featureToDeselect)) {
            //         this.selectInteraction.getFeatures().clear();
            //         this.selectInteraction.dispatchEvent({
            //             type: 'select',
            //             selected: [],
            //             deselected: [featureToDeselect]
            //         });
            //     }
            // },
    
            // changeFeatureName: function(featureId, featureName) {
            //     const feature = this.vectorSource.getFeatureById(featureId);
            //     const featureSelected = this.getFeatureSelected();
            //     feature.set('name', featureName);
            //     if (feature === featureSelected) {
            //         feature.setStyle(this.getFeatureSelectStyle(featureName));
            //     }
            // },
    
            // deleteFeature: function(featureId) {
            //     const feature = this.vectorSource.getFeatureById(featureId); 
            //     this.vectorSource.removeFeature(feature);
            //     feature.setStyle(this.getFeatureEmptyStyle());
            // },
    
            // enableAddFeature: function(enable) {
            //     this.drawInteraction.setActive(enable);
            // }
        }();
    }

    componentDidMount() {
        // this.mapManager.init();
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
import { Component, OnInit, Input } from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { ZoomSlider, OverviewMap } from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Projection from "ol/proj/Projection";
import GeoJSON from "ol/format/GeoJSON";
import { FarmerService } from "src/app/services/farmer.service";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import { Overlay } from 'ol';
import OverlayPositioning from 'ol/OverlayPositioning';

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  @Input() farmlocation;
  @Input() farmerid;
  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  modify: Modify;
  projection: Projection;
  basemap: TileLayer;
  draw: any;
  snap: any;
  geometryType: any;
  enabledraw = true;
  enablemodify = true;
  enablesave = true;
  enableclear = true;
  // sketch: any;
  // helpTooltipElement: any;
  // helpTooltip: any;
  // measureTooltipElement: any;
  // measureTooltip: any;
  // continuePolygonMsg = "Click to continue drawing the polygon";
  // continueLineMsg = "Click to continue drawing the line";

  constructor(private farmerService: FarmerService) {}

  ngOnInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  initMap() {

    // var pointerMoveHandler = function(evt) {
    //   if (evt.dragging) {
    //     return;
    //   }
    //   var helpMsg = "Click to start drawing";

    //   if (this.sketch) {
    //     var geom = this.sketch.getGeometry();
    //     if (geom instanceof Polygon) {
    //       helpMsg = this.continuePolygonMsg;
    //     } else if (geom instanceof LineString) {
    //       helpMsg = this.continueLineMsg;
    //     }
    //   }

    //   this.helpTooltipElement.innerHTML = helpMsg;
    //   this.helpTooltip.setPosition(evt.coordinate);

    //   this.helpTooltipElement.classList.remove("hidden");
    // };

    this.geometryType = "Polygon";
    this.raster = new TileLayer({
      source: new OSM()
    });

    this.basemap = new TileLayer({
      source: new XYZ({
        maxZoom: 17,
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Imagery/MapServer/tile/{z}/{y}/{x}"
      })
    });
    this.source = new VectorSource({
      format: new GeoJSON()
    });
    this.vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    this.projection = new Projection({
      code: "EPSG:3125",
      units: "m",
      global: false
    });
    this.map = new Map({
      layers: [this.basemap, this.vector],
      target: "map",
      view: new View({
        // projection: this.projection,
        // center: [13910469.0295, 903791.4224],
        zoom: 15,
        maxZoom: 20
      })
    });
    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    // var overviewMapControl = new OverviewMap({
    //   layers: [this.basemap]
    // });
    // this.map.addControl(overviewMapControl);
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    // this.map.on("pointermove", pointerMoveHandler);

    // this.map.getViewport().addEventListener("mouseout", function() {
    //   // this.helpTooltipElement.classList.add("hidden");
    // });

    // var formatArea = function(polygon) {
    //   var area = this.getArea(polygon);
    //   var output;
    //   if (area > 10000) {
    //     output =
    //       Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    //   } else {
    //     output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    //   }
    //   return output;
    // };

    this.enablesave = false;
    this.enableclear = false;
    this.enablemodify = false;
    if (this.farmlocation.geolocation) {
      this.source.addFeatures(
        new GeoJSON().readFeatures(this.farmlocation.geolocation)
      );
      this.enabledraw = false;
      this.enablemodify = true;
      this.enableclear = true;
    }

    // this.addInteraction();
  }

  // addInteraction() {

  //   this.draw = new Draw({
  //     source: this.source,
  //     type: this.geometryType,
  //     style: new Style({
  //       fill: new Fill({
  //         color: "rgba(255, 255, 255, 0.2)"
  //       }),
  //       stroke: new Stroke({
  //         color: "rgba(0, 0, 0, 0.5)",
  //         lineDash: [10, 10],
  //         width: 2
  //       }),
  //       image: new CircleStyle({
  //         radius: 5,
  //         stroke: new Stroke({
  //           color: "rgba(0, 0, 0, 0.7)"
  //         }),
  //         fill: new Fill({
  //           color: "rgba(255, 255, 255, 0.2)"
  //         })
  //       })
  //     })
  //   });

  //   this.createMeasureTooltip();
  //   this.createHelpTooltip();

  //   var listener;
  //   this.draw.on("drawstart", evt => {
  //     // set sketch
  //     this.sketch = evt.feature;

  //     /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
  //     var tooltipCoord = evt.coordinate;

  //     listener = this.sketch.getGeometry().on("change", function(evt) {
  //       var geom = evt.target;
  //       var output;
  //       if (geom instanceof Polygon) {
  //         output = this.formatArea(geom);
  //         tooltipCoord = geom.getInteriorPoint().getCoordinates();
  //       } else if (geom instanceof LineString) {
  //         output = this.formatLength(geom);
  //         tooltipCoord = geom.getLastCoordinate();
  //       }
  //       this.measureTooltipElement.innerHTML = output;
  //       this.measureTooltip.setPosition(tooltipCoord);
  //     });
  //   });

  //   this.draw.on("drawend", function() {
  //     this.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
  //     this.measureTooltip.setOffset([0, -7]);
  //     // unset sketch
  //     this.sketch = null;
  //     // unset tooltip so that a new one can be created
  //     this.measureTooltipElement = null;
  //     this.createMeasureTooltip();
  //     this.unByKey(listener);
  //   });
  // }

  // /**
  //  * Creates a new help tooltip
  //  */
  // createHelpTooltip() {
  //   if (this.helpTooltipElement) {
  //     this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
  //   }
  //   this.helpTooltipElement = document.createElement("div");
  //   this.helpTooltipElement.className = "ol-tooltip hidden";
  //   this.helpTooltip = new Overlay({
  //     element: this.helpTooltipElement,
  //     offset: [15, 0],
  //     positioning: OverlayPositioning.CENTER_LEFT
  //   });
  //   this.map.addOverlay(this.helpTooltip);
  // }

  // /**
  //  * Creates a new measure tooltip
  //  */
  // createMeasureTooltip() {
  //   if (this.measureTooltipElement) {
  //     this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
  //   }
  //   this.measureTooltipElement = document.createElement("div");
  //   this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
  //   this.measureTooltip = new Overlay({
  //     element: this.measureTooltipElement,
  //     offset: [0, -15],
  //     positioning: OverlayPositioning.BOTTOM_CENTER
  //   });
  //   this.map.addOverlay(this.measureTooltip);
  // }

  // addInteractions() {
  //   this.draw = new Draw({
  //     source: this.source,
  //     type: this.geometryType
  //   });
  //   this.map.addInteraction(this.draw);
  //   this.snap = new Snap({ source: this.source });
  //   this.map.addInteraction(this.snap);
  // }
  startDraw() {
    this.enabledraw = false;
    this.enablesave = true;
    this.enableclear = true;

    this.draw = new Draw({
      source: this.source,
      type: this.geometryType
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);

    this.draw.on("drawend", event => {
      this.map.removeInteraction(this.draw);
      event.feature.setId(this.farmlocation.objid);
    });
  }
  startModify() {
    this.enablemodify = false;
    this.enabledraw = false;
    this.enablesave = true;
    this.enableclear = true;
    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);
  }

  savePolygon() {
    let format = new GeoJSON();
    let data = format.writeFeatures(this.vector.getSource().getFeatures());
    this.farmerService.getItem(this.farmerid).then(item => {
      item.farmlocations = item.farmlocations.map(fl =>
        fl.objid === this.farmlocation.objid
          ? { ...fl, geolocation: JSON.parse(data) }
          : fl
      );
      this.farmerService.updatefarmer(item);
    });
    this.enablemodify = true;
    this.enablesave = false;
    this.enableclear = true;
  }

  clearMap() {
    this.vector.getSource().clear();
    this.farmerService.getItem(this.farmerid).then(item => {
      item.farmlocations = item.farmlocations.map(fl =>
        fl.objid === this.farmlocation.objid ? { ...fl, geolocation: null } : fl
      );
      this.farmerService.updatefarmer(item);
    });
    this.enabledraw = true;
    this.enablemodify = false;
    this.enablesave = false;
    this.enableclear = false;
  }
}

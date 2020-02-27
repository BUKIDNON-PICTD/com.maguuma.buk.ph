import { Component, OnInit } from "@angular/core";

import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import {ZoomSlider} from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Projection from "ol/proj/Projection";

@Component({
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  initMap() {
    this.geometryType = "Polygon";
    this.raster = new TileLayer({
      source: new OSM()
    });

    this.basemap = new TileLayer({
      source: new XYZ({
        
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
            'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Imagery/MapServer/tile/{z}/{y}/{x}'
      })
    });
    this.source = new VectorSource();
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
        zoom: 5,
        maxZoom: 17,
      })
    });
    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
 
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);
    this.addInteractions();
  }

  addInteractions() {
    this.draw = new Draw({
      source: this.source,
      type: this.geometryType
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);
  }
}

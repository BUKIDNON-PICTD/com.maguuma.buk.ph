import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import {Draw, Modify, Snap} from 'ol/interaction';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import GeometryType from 'ol/geom/GeometryType';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  modify: Modify;
  draw: any;
  snap: any;
  geometryType: any;
  constructor() { }

  ngOnInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  initMap() {
    this.geometryType = 'Polygon';
    this.raster = new TileLayer({
      source: new OSM()
    });
    this.source = new VectorSource();
    this.vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    this.map = new Map({
      layers: [this.raster, this.vector],
      target: 'map',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });

    this.modify = new Modify({source: this.source});
    this.map.addInteraction(this.modify);
    this.addInteractions();
  }

  addInteractions() {
    this.draw = new Draw({
      source: this.source,
      type: this.geometryType
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({source: this.source});
    this.map.addInteraction(this.snap);

  }

}

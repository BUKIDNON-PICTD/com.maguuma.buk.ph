import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { ZoomSlider, OverviewMap, defaults } from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Projection from "ol/proj/Projection";
import GeoJSON from "ol/format/GeoJSON";
import { FarmerService } from "src/app/services/farmer.service";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import Overlay from "ol/Overlay";

import { getArea } from "ol/sphere";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import OverlayPositioning from "ol/OverlayPositioning";
import { unByKey } from "ol/Observable";
@Component({
  selector: 'app-olmappreview',
  templateUrl: './olmappreview.component.html',
  styleUrls: ['./olmappreview.component.scss'],
})
export class OlmappreviewComponent implements OnInit {
  @Input() farmlocation;
  @Input() farmerid;
  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  barangaysource: VectorSource;
  barangayvector: VectorLayer;
  farmsource: VectorSource;
  farmvector: VectorLayer;
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
  sketch: any;
  helpTooltipElement: any;
  helpTooltip: any;
  measureTooltipElement: any;
  measureTooltip: any;
  continuePolygonMsg = "Click to continue drawing the polygon";
  continueLineMsg = "Click to continue drawing the line";
  helpMsg: any;

  mapsloaded: boolean = false;
  divmapid: any;
  constructor(
    private farmerService: FarmerService,
    private httpClient: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  ngOnInit() {
    let divmap = this.renderer.createElement('div');
    this.renderer.addClass(divmap, 'previewmap');
    this.divmapid = this.farmlocation.objid + this.create_UUID();
    this.renderer.setAttribute(divmap, 'id', this.divmapid);
    this.renderer.appendChild(this.el.nativeElement, divmap);
  }
  ngAfterViewInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  initMap() {
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
          color: "#fc2803",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#fc2803"
          })
        })
      })
    });

    this.map = new Map({
      layers: [this.basemap, this.vector],
      target: this.divmapid,
      view: new View({
        zoom: 15,
        maxZoom: 20
      }),
      controls: defaults({
        attribution: false,
        zoom: false
      })
    });
    // var zoomslider = new ZoomSlider();
    // this.map.addControl(zoomslider);
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    if (this.farmlocation?.geolocation && this.farmlocation?.geolocation.type === "FeatureCollection") {
      this.source.addFeatures(
        new GeoJSON().readFeatures(this.farmlocation.geolocation)
      );

      //zoom to layer
      var extent = this.vector.getSource().getExtent();
      this.map.getView().fit(extent);
    }
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
}

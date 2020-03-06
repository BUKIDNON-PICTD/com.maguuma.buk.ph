import { Component, OnInit, Input } from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer, Tile } from "ol/layer";
import { ZoomSlider, OverviewMap } from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style,Text } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Projection from "ol/proj/Projection";
import GeoJSON from "ol/format/GeoJSON";
import { FarmerService } from "src/app/services/farmer.service";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import { Overlay } from "ol";
import OverlayPositioning from "ol/OverlayPositioning";
import { getArea } from "ol/sphere";
import { Observable } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import * as proj4x from "proj4";
let proj4 = (proj4x as any).default;

@Component({
  selector: "app-cachemap",
  templateUrl: "./cachemap.component.html",
  styleUrls: ["./cachemap.component.scss"]
})
export class CachemapComponent implements OnInit {
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
  sketch: any;
  helpTooltipElement: any;
  helpTooltip: any;
  measureTooltipElement: any;
  measureTooltip: any;
  continuePolygonMsg = "Click to continue drawing the polygon";
  continueLineMsg = "Click to continue drawing the line";
  extent: any;

  constructor(
    private farmerService: FarmerService,
    protected httpClient: HttpClient
  ) {}

  ngOnInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  initMap() {
    // proj4.defs(
    //   "EPSG:3125",
    //   "+proj=tmerc +lat_0=0 +lon_0=125 +k=0.99995 +x_0=500000 +y_0=0 +ellps=clrk66 +towgs84=-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06 +units=m +no_defs"
    // );
    // this.projection = new Projection({
    //   code: "EPSG:3125"
    // });

    // this.extent = [
    //   13784343.025655,
    //   814368.207926,
    //   14048821.648763,
    //   978738.393527
    // ];
    // this.projection.setExtent(this.extent);


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

      // source: new XYZ({
      //   attributions: '<a href=""></a>',
      //   url:
      //     "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      // })
    });
    this.source = new VectorSource({
      format: new GeoJSON(),
    });
  
  var labelStyle = new Style({
    text: new Text({
      font: '12px Calibri,sans-serif',
      overflow: true,
      fill: new Fill({
        color: '#000'
      }),
      stroke: new Stroke({
        color: '#fff',
        width: 3
      })
    })
  });
  var countryStyle = new Style({
    // fill: new Fill({
    //   color: 'rgba(255, 255, 255, 0.6)'
    // }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1
    })
  });
  var style = [countryStyle, labelStyle];

    this.vector = new VectorLayer({
      declutter: true,
      source: this.source,
      style: function(feature) {
        labelStyle.getText().setText(feature.get('brgyname'));
        return style;
      }
    });
 
    this.map = new Map({
      layers: [this.basemap, this.vector],
      target: "map",
      view: new View({
        // projection : new Projection("EPSG:3125"),
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

    // this.createMeasureTooltip();
    // this.createHelpTooltip();
    // this.map.on("pointermove", this.pointerMoveHandler);

    // this.map.getViewport().addEventListener("mouseout", function() {
    //   this.helpTooltipElement.classList.add("hidden");
    // });

    this.getMuniBoundaries().subscribe(result => {
      this.source.addFeatures(
        new GeoJSON().readFeatures(result,{
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        })
      );
    });
   
    // this.source.addFeatures(
    //   new GeoJSON().readFeatures(this.farmlocation.geolocation);
    // );

    // this.addInteraction();
  }

  private getMuniBoundaries(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/barangay.json");
  }

  
}

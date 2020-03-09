import { Component, OnInit, Input } from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer, Tile } from "ol/layer";
import { ZoomSlider, OverviewMap } from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
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
  barangaysource: VectorSource;
  barangayvector: VectorLayer;
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
    private httpClient: HttpClient
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
    var farmsLabelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: false,
        fill: new Fill({
          color: "#000"
        }),
        backgroundFill : new Fill({
          color: "#ffcc33"
        }),
        padding: [4, 8, 4, 8]
      })
    });

    var farmsFillStyle = new Style({
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
    });

    var farmsstyle = [farmsFillStyle, farmsLabelStyle];
    
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
   

    var labelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: true,
        fill: new Fill({
          color: "#000"
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3
        })
      })
    });
    var countryStyle = new Style({
      // fill: new Fill({
      //   color: 'rgba(255, 255, 255, 0.6)'
      // }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1
      })
    });
    var style = [countryStyle, labelStyle];

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

    this.barangaysource = new VectorSource({
      format: new GeoJSON()
    });

    this.barangayvector = new VectorLayer({
      declutter: true,
      source: this.barangaysource,
      style: function(feature) {
        labelStyle.getText().setText(feature.get("brgyname"));
        return style;
      }
    });

    this.map = new Map({
      layers: [this.basemap, this.barangayvector, this.vector],
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

    this.getMuniBoundaries().subscribe(result => {
      this.barangaysource.addFeatures(
        new GeoJSON().readFeatures(result, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        })
      );
    });

    this.farmerService.getRawItems().then(async items => {
      let x = await items
        .filter(farmer => {
          return farmer.farmlocations?.find(
            farmlocation => farmlocation.geolocation
          );
        })
        .map(filteredfarmer => {
          return {
            objid: filteredfarmer.objid,
            fno: filteredfarmer.fno,
            features: filteredfarmer.farmlocations
              .filter(farmlocation => farmlocation.geolocation)
              .map(farmlocation => {
                return farmlocation.geolocation.features;
              })
          };
        });
      let geojson = {
        type: "FeatureCollection",
        features: []
      };
      await x.forEach(farmer => {
        farmer.features.forEach(feature => {
          geojson.features.push(feature[0]);
        });
      });
      this.source.addFeatures(
        new GeoJSON().readFeatures(geojson)
      );

      this.vector.setStyle( (feature, resolution) => {
        let geom = feature.getGeometry();
        var output;
        if (geom instanceof Polygon){
          output = this.formatArea(geom);
        }
        farmsLabelStyle.getText().setText(output);
        return farmsstyle;
      });
    });
  }
  formatArea (polygon){
    var area = getArea(polygon);
    var output;
    // if (area > 10000) {
    //   output =
    //     Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    // } else {
    //   output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    // }
    output = Math.round(area * 100) / 100;
    output = output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "sqm";
    return output;
  }
  private getMuniBoundaries(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/barangay.json");
  }
}

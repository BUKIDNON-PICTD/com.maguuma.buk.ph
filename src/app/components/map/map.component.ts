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
import { ZoomSlider, OverviewMap } from "ol/control";
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
  selector: "map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit, AfterViewInit {
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

  // @ViewChild('helpTooltipElement') helpTooltipElement: ElementRef;

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

  mapsloaded: boolean = false;

  constructor(
    private farmerService: FarmerService,
    private httpClient: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    setTimeout(_ => this.initMap(), 2000);
    
  }
  initMap() {
    
    var drawLabelStyle = new Style({
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

    var drawFillStyle = new Style({
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
    });
    var drawstyle = [drawFillStyle, drawLabelStyle];
    
    var barangaylabelStyle = new Style({
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
    var barangaystylefill = new Style({
      // fill: new Fill({
      //   color: 'rgba(255, 255, 255, 0.6)'
      // }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1
      })
    });
    var barangaystyle = [barangaystylefill, barangaylabelStyle];

    //base map
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
    //allfarms
    this.farmsource = new VectorSource({
      format: new GeoJSON()
    });
    this.farmvector = new VectorLayer({
      source: this.farmsource,
    });

    //draw map
    this.source = new VectorSource({
      format: new GeoJSON()
    });
    this.vector = new VectorLayer({
      source: this.source,
      // style: 
    });
    //barangay map
    this.barangaysource = new VectorSource({
      format: new GeoJSON()
    });
    this.barangayvector = new VectorLayer({
      declutter: true,
      source: this.barangaysource,
      style: function(feature) {
        barangaylabelStyle.getText().setText(feature.get("brgyname"));
        return barangaystyle;
      }
    });

    this.map = new Map({
      layers: [this.basemap, this.barangayvector, this.farmvector, this.vector],
      target: "map",
      view: new View({
        zoom: 15,
        maxZoom: 20
      })
    });
    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    //add barangay boundaries
    this.getBrgyBoundaries().subscribe(result => {
      this.barangaysource.addFeatures(
        new GeoJSON().readFeatures(result, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        })
      );
    });
    //edit feature controls
    this.enablesave = false;
    this.enableclear = false;
    this.enablemodify = false;
    if (this.farmlocation?.geolocation) {
      this.source.addFeatures(
        new GeoJSON().readFeatures(this.farmlocation.geolocation)
      );
      this.enabledraw = false;
      this.enablemodify = true;
      this.enableclear = true;

      //zoom to layer
      var extent = this.vector.getSource().getExtent();
      this.map.getView().fit(extent);
      this.vector.setStyle( (feature) => {
        let geom = feature.getGeometry();
        var output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
        }
        drawLabelStyle.getText().setText(output);
        return drawstyle;
      });
    }
    
    this.getalllayers();
    this.createMeasureTooltip();
  }

  getalllayers() {
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
    this.farmerService.getRawItems().then(async items => {
      this.mapsloaded = false;
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
      this.farmsource.addFeatures(new GeoJSON().readFeatures(geojson));
      this.farmvector.setStyle( (feature, resolution) => {
        let geom = feature.getGeometry();
        var output;
        if (geom instanceof Polygon){
          output = this.formatArea(geom);
        }
        farmsLabelStyle.getText().setText(output);
        return farmsstyle;
      });
      this.mapsloaded = true;
    });
  }

  // pointerMoveHandler(evt) {
  //   if (evt.dragging) {
  //     return;
  //   }
  //   // this.helpMsg = this.renderer.createText('Click to start drawing');
  //   // if (this.sketch) {
  //   //   var geom = this.sketch.getGeometry();
  //   //   if (geom instanceof Polygon) {
  //   //     this.helpMsg = this.renderer.createText(this.continuePolygonMsg);
  //   //   } else if (geom instanceof LineString) {
  //   //     this.helpMsg = this.renderer.createText(this.continueLineMsg);
  //   //   }
  //   // }

  //   // this.renderer.appendChild(this.helpTooltipElement, this.helpMsg);

  //   this.helpTooltip.setPosition(evt.coordinate);
  //   this.renderer.removeClass(this.helpTooltipElement.nativeElement, "hidden");
  // }
  removehelpTooltipElement() {
    this.map.getViewport().addEventListener("mouseout", () =>  {
      this.renderer.addClass(this.helpTooltipElement, 'hidden');
      // console.log(this.helpTooltipElement);
    });
  }
  addpointermovehandler() {
    this.map.on("pointermove", evt => {
      if (evt.dragging) {
        return;
      }

      this.renderer.setProperty(this.helpTooltipElement, 'textContent', 'Click to continue drawing the polygon');

      this.helpTooltip.setPosition(evt.coordinate);
      this.renderer.removeClass(
        this.helpTooltipElement,
        "hidden"
      );
    });
  }

  createHelpTooltip() {
    if (this.helpTooltipElement) {
      // this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
      this.el.nativeElement.remove(this.helpTooltipElement);
    }

    this.helpTooltipElement = this.renderer.createElement("div");
    this.renderer.addClass(this.helpTooltipElement, "ol-tooltip");
    this.renderer.addClass(this.helpTooltipElement, "hidden");
    this.renderer.appendChild(this.el.nativeElement, this.helpTooltipElement);

    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: OverlayPositioning.CENTER_LEFT
    });
    this.map.addOverlay(this.helpTooltip);
  }

  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.renderer.removeChild(this.el.nativeElement, this.measureTooltipElement);
    }
    this.measureTooltipElement = this.renderer.createElement("div");
    this.renderer.addClass(this.measureTooltipElement, "ol-tooltip");
    this.renderer.addClass(this.measureTooltipElement, "ol-tooltip-measure");
    this.renderer.appendChild(this.el.nativeElement, this.measureTooltipElement);

    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: OverlayPositioning.BOTTOM_CENTER
    });
    this.map.addOverlay(this.measureTooltip);
  }

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

    // this.draw.on("drawend", event => {
    //   this.map.removeInteraction(this.draw);
    //   event.feature.setId(this.farmlocation.objid);
    // });

    // this.createMeasureTooltip();
    // this.addpointermovehandler();

    var listener;
    this.draw.on("drawstart", evt => {
      // set sketch
      this.sketch = evt.feature;

      var tooltipCoord = evt.coordinate;

      listener = this.sketch.getGeometry().on("change", evt => {
        var geom = evt.target;
        var output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        }
        this.renderer.setProperty(this.measureTooltipElement, 'textContent', output);
        // this.measureTooltipElement.innerHTML = output;
        this.measureTooltip.setPosition(tooltipCoord);
      });
    });
    this.draw.on("drawend", evt => {
      
      this.renderer.setProperty(this.measureTooltipElement, 'class', 'ol-tooltip ol-tooltip-static');
      this.measureTooltip.setOffset([0, -7]);
      // unset sketch
      this.sketch = null;
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null;
      this.createMeasureTooltip();
      unByKey(listener);

      this.map.removeInteraction(this.draw);
      evt.feature.setId(this.farmlocation.objid);
    });
  }

  startModify() {
    this.enablemodify = false;
    this.enabledraw = false;
    this.enablesave = true;
    this.enableclear = true;
    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);

    // this.addpointermovehandler();
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
    this.map.removeInteraction(this.draw);
    this.getalllayers();
    // this.renderer.addClass(this.helpTooltipElement, 'hidden');
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

  private getBrgyBoundaries(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/barangay.json");
  }
}

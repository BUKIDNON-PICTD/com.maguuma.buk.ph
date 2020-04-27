import { MapService } from "./../../services/map.service";
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap, Select, Extent } from "ol/interaction";
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
import { getCenter } from "ol/extent";

import { getArea } from "ol/sphere";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";
import OverlayPositioning from "ol/OverlayPositioning";
import { unByKey } from "ol/Observable";

@Component({
  selector: "app-olmap",
  templateUrl: "./olmap.component.html",
  styleUrls: ["./olmap.component.scss"],
})
export class OlmapComponent implements OnInit {
  @Input() item;
  @Input() type;
  @Input() farmerid;
  @Input() mapmode;
  @Output() selectedFeature: EventEmitter<any> = new EventEmitter();
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

  // @ViewChild('helpTooltipElement') helpTooltipElement: ElementRef;
  @ViewChild("popup") popup: ElementRef;
  @ViewChild("popupcontent") popupcontent: ElementRef;
  popupoverlay: Overlay;

  formatArea(polygon) {
    var area = getArea(polygon);
    var output;
    // if (area > 10000) {
    //   output =
    //     Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
    // } else {
    //   output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
    // }
    output = Math.round(area * 100) / 100;
    output =
      output.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "sqm";
    return output;
  }

  constructor(
    private farmerService: FarmerService,
    private httpClient: HttpClient,
    private renderer: Renderer2,
    private el: ElementRef,
    private mapService: MapService
  ) {}

  ngOnInit() {
    setTimeout((_) => this.initMap(), 2000);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.item.previousValue) {
      this.drawlocationfeature();
    }
  }

  initMap() {
    var barangaylabelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: true,
        fill: new Fill({
          color: "#000",
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 3,
        }),
      }),
    });
    var barangaystylefill = new Style({
      // fill: new Fill({
      //   color: 'rgba(255, 255, 255, 0.6)'
      // }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1,
      }),
    });
    var barangaystyle = [barangaystylefill, barangaylabelStyle];

    //base map
    this.geometryType = "Polygon";
    this.raster = new TileLayer({
      source: new OSM(),
    });
    this.basemap = new TileLayer({
      source: new XYZ({
        maxZoom: 17,
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Imagery/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Imagery/MapServer/tile/{z}/{y}/{x}",
      }),
    });
    //allfarms
    this.farmsource = new VectorSource({
      format: new GeoJSON(),
    });
    this.farmvector = new VectorLayer({
      source: this.farmsource,
    });

    //draw map
    this.source = new VectorSource({
      format: new GeoJSON(),
    });
    this.vector = new VectorLayer({
      source: this.source,
      // style:
    });
    //barangay map
    this.barangaysource = new VectorSource({
      format: new GeoJSON(),
    });
    this.barangayvector = new VectorLayer({
      declutter: true,
      source: this.barangaysource,
      style: function (feature) {
        barangaylabelStyle.getText().setText(feature.get("brgyname"));
        return barangaystyle;
      },
    });

    this.map = new Map({
      layers: [this.basemap, this.barangayvector, this.farmvector, this.vector],
      target: this.mapmode === "preview" ? "preview" : "map",
      view: new View({
        zoom: 15,
        maxZoom: 20,
      }),
    });

    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    //add barangay boundaries
    this.getBrgyBoundaries().subscribe((result) => {
      this.barangaysource.addFeatures(
        new GeoJSON().readFeatures(result, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        })
      );
    });
    //edit feature controls
    this.enablesave = false;
    this.enableclear = false;
    this.enablemodify = false;

    this.drawlocationfeature();
    this.getalllayers();
    this.createMeasureTooltip();
    this.createpopup();
  }

  closepopup() {
    this.popupoverlay.setPosition(undefined);
  }

  getalllayers() {
    var farmsLabelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: false,
        fill: new Fill({
          color: "#000",
        }),
        backgroundFill: new Fill({
          color: "#ffcc33",
        }),
        padding: [4, 8, 4, 8],
      }),
    });

    var farmsFillStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "#fc2803",
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "#fc2803",
        }),
      }),
    });

    var farmsstyle = [farmsFillStyle, farmsLabelStyle];

    this.mapService.getItems().then((items) => {
      let geojson = {
        type: "FeatureCollection",
        features: [],
      };

      if (items && this.item.location) {
        geojson.features = items
          .filter((o) => o.features[0].id !== this.item.location.objid)
          .map((item) => item.features[0]);
      } else {
        geojson.features = items.map((item) => item.features[0]);
      }
      if (items) {
        this.farmsource.clear();
        this.farmsource.addFeatures(new GeoJSON().readFeatures(geojson));
        this.farmvector.setStyle((feature, resolution) => {
          let geom = feature.getGeometry();
          var output;
          if (geom instanceof Polygon) {
            output = this.formatArea(geom);
          }

          farmsLabelStyle.getText().setText(output);
          return farmsstyle;
        });
      }

      this.mapsloaded = true;
    });
  }
  createpopup() {
    this.popupoverlay = new Overlay({
      element: this.popup.nativeElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.map.addOverlay(this.popupoverlay);

    if (this.mapmode === "preview") {
      var selectSingleClick = new Select();
      this.map.addInteraction(selectSingleClick);
      selectSingleClick.on("select", (e) => {
        if (e.selected[0]) {
          let selecteditem = e.selected[0];
          let extent = selecteditem.getGeometry().getExtent();
          let farmerid = selecteditem.get("farmerid");
          let itemtype = selecteditem.get("itemtype");
          let itemid = selecteditem.get("itemid");

          this.selectedFeature.emit({
            locationid: selecteditem.getId(),
            farmerid: farmerid,
            itemtype: itemtype,
            itemid: itemid,
          });

          this.farmerService.getItem(farmerid).then((item) => {
            if (item) {
              let content = "";
              content +=
                "<h5><strong>Farmer</strong> : " + item.farmer.name + "</h5>";
              if (itemtype === "commodity") {
                let commodity = item.commodities.find(
                  (o) => o.objid === itemid
                );
                console.log(commodity);
                if (commodity) {
                  content +=
                    " <h5>" +
                    commodity.variety.commoditytype.commodity.name +
                    "</h5>";
                  content +=
                    "<p>" +
                    commodity.variety.commoditytype.unit +
                    " : " +
                    commodity.quantity;
                  content +=
                    "<br>Commodity Type : " +
                    commodity.variety.commoditytype.name;
                  content += "<br>Variety : " + commodity.variety.name;
                  content +=
                    "<br>Sruvey Period : " +
                    commodity.surveyperiod.name +
                    "</p>";
                  this.renderer.setProperty(
                    this.popupcontent.nativeElement,
                    "innerHTML",
                    content
                  );
                } else {
                  this.renderer.setProperty(
                    this.popupcontent.nativeElement,
                    "innerHTML",
                    "No Farmer Data"
                  );
                }
              } else {
                let livestock = item.livestocks.find((o) => o.objid === itemid);
                if (livestock) {
                  content += " <h5>" + livestock.breed.species.name + "</h5>";
                  content +=
                    "<p>" + "Sruvey Period : " + livestock.surveyperiod.name;
                  this.renderer.setProperty(
                    this.popupcontent.nativeElement,
                    "innerHTML",
                    content
                  );
                } else {
                  this.renderer.setProperty(
                    this.popupcontent.nativeElement,
                    "innerHTML",
                    "No Farmer Data"
                  );
                }
              }
            } else {
              this.renderer.setProperty(
                this.popupcontent.nativeElement,
                "innerHTML",
                "No Farmer Data"
              );
            }
          });

          this.popupoverlay.setPosition(getCenter(extent));
        }
      });
    }
  }
  drawlocationfeature() {
    var drawLabelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: false,
        fill: new Fill({
          color: "#000",
        }),
        backgroundFill: new Fill({
          color: "#ffcc33",
        }),
        padding: [4, 8, 4, 8],
      }),
    });

    var drawFillStyle = new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "#ffcc33",
        }),
      }),
    });
    var drawstyle = [drawFillStyle, drawLabelStyle];

    if (this.item.location?.geolocation?.type) {
      this.source.clear();
      this.source.addFeatures(
        new GeoJSON().readFeatures(this.item.location.geolocation)
      );
      this.enabledraw = false;
      this.enablemodify = true;
      this.enableclear = true;

      //zoom to layer
      var extent = this.vector.getSource().getExtent();
      this.map.getView().fit(extent);

      this.vector.setStyle((feature) => {
        let geom = feature.getGeometry();
        var output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
        }
        drawLabelStyle.getText().setText(output);
        return drawstyle;
      });
    } else {
      this.source.clear();
      // var extent = this.barangayvector.getSource().getExtent();
      // this.map.getView().fit(extent);
    }
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
    this.map.getViewport().addEventListener("mouseout", () => {
      this.renderer.addClass(this.helpTooltipElement, "hidden");
      // console.log(this.helpTooltipElement);
    });
  }
  addpointermovehandler() {
    this.map.on("pointermove", (evt) => {
      if (evt.dragging) {
        return;
      }

      this.renderer.setProperty(
        this.helpTooltipElement,
        "textContent",
        "Click to continue drawing the polygon"
      );

      this.helpTooltip.setPosition(evt.coordinate);
      this.renderer.removeClass(this.helpTooltipElement, "hidden");
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
      positioning: OverlayPositioning.CENTER_LEFT,
    });
    this.map.addOverlay(this.helpTooltip);
  }

  createMeasureTooltip() {
    if (this.measureTooltipElement) {
      this.renderer.removeChild(
        this.el.nativeElement,
        this.measureTooltipElement
      );
    }
    this.measureTooltipElement = this.renderer.createElement("div");
    this.renderer.addClass(this.measureTooltipElement, "ol-tooltip");
    this.renderer.addClass(this.measureTooltipElement, "ol-tooltip-measure");
    this.renderer.appendChild(
      this.el.nativeElement,
      this.measureTooltipElement
    );

    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: OverlayPositioning.BOTTOM_CENTER,
    });
    this.map.addOverlay(this.measureTooltip);
  }

  startDraw() {
    this.enabledraw = false;
    this.enablesave = true;
    this.enableclear = true;

    this.draw = new Draw({
      source: this.source,
      type: this.geometryType,
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
    this.draw.on("drawstart", (evt) => {
      // set sketch
      this.sketch = evt.feature;

      var tooltipCoord = evt.coordinate;

      listener = this.sketch.getGeometry().on("change", (evt) => {
        var geom = evt.target;
        var output;
        if (geom instanceof Polygon) {
          output = this.formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        }
        this.renderer.setProperty(
          this.measureTooltipElement,
          "textContent",
          output
        );
        // this.measureTooltipElement.innerHTML = output;
        this.measureTooltip.setPosition(tooltipCoord);
      });
    });
    this.draw.on("drawend", (evt) => {
      // this.renderer.setProperty(this.measureTooltipElement, 'class', 'ol-tooltip ol-tooltip-static');
      // this.measureTooltip.setOffset([0, -7]);
      // unset sketch
      this.sketch = null;
      // unset tooltip so that a new one can be created
      this.measureTooltipElement = null;
      // this.createMeasureTooltip();
      unByKey(listener);

      this.map.removeInteraction(this.draw);
      evt.feature.setId(this.item.location.objid);
      evt.feature.setProperties({
        farmerid: this.farmerid,
        itemtype: this.type,
        itemid: this.item.objid,
      });
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
    this.item.location = {
      ...this.item.location,
      geolocation: JSON.parse(data),
    };
    this.farmerService.getItem(this.farmerid).then((item) => {
      if (this.type === "commodity") {
        item.commodities = item.commodities.map((c) =>
          c.objid === this.item.objid ? (c = this.item) : c
        );
      } else {
        item.livestocks = item.livestocks.map((l) =>
          l.objid === this.item.objid ? (l = this.item) : l
        );
      }
      // console.log(item);
      this.farmerService.updatefarmer(item);
      this.mapService.saveItem(JSON.parse(data));
    });
    this.enablemodify = true;
    this.enablesave = false;
    this.enableclear = true;
    this.map.removeInteraction(this.draw);
    this.map.removeInteraction(this.modify);
    this.getalllayers();
    // this.renderer.addClass(this.helpTooltipElement, 'hidden');
  }

  clearMap() {
    this.vector.getSource().clear();
    this.item.location = { ...this.item.location, geolocation: null };
    this.farmerService.getItem(this.farmerid).then((item) => {
      if (this.type === "commodity") {
        item.commodities = item.commodities.map((c) =>
          c.objid === this.item.objid ? (c = this.item) : c
        );
      } else {
        item.livestocks = item.livestocks.map((l) =>
          l.objid === this.item.objid ? (l = this.item) : l
        );
      }

      this.farmerService.updatefarmer(item);
      this.mapService.deleteItem(item.objid);
    });
    this.enabledraw = true;
    this.enablemodify = false;
    this.enablesave = false;
    this.enableclear = false;
    this.getalllayers();
  }

  private getBrgyBoundaries(): Observable<any[]> {
    return this.httpClient.get<any[]>("assets/barangay.json");
  }
}

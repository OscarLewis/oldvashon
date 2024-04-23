// Local imports
import "../assets/map.css";
import houseSVG from "./house.svg";
import feature_collection from "./spatialite";

// OpenLayers imports
import {
  Attribution,
  Control,
  defaults as defaultControls,
} from "ol/control.js";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style.js";
import { fromLonLat, toLonLat } from "ol/proj";
import { Vector } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import { toStringHDMS, type Coordinate } from "ol/coordinate";
import VectorLayer from "ol/layer/Vector";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import Overlay from "ol/Overlay";
import { register } from "ol/proj/proj4";

// Proj4 import
import proj4 from "proj4";

// Define EPSG:2285 (NAD83 / Washington North (ftUS))
// This definition comes from QGIS
proj4.defs(
  "NAD83/Washington_North",
  "+proj=lcc +lat_0=47 +lon_0=-120.833333333333 +lat_1=48.7333333333333 +lat_2=47.5 +x_0=500000.0001016 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=us-ft +no_defs"
);

// Register proj4 transformations with OpenLayers
register(proj4);

// Attributions
const attribution = new Attribution({
  collapsible: false,
});
const imagery_attribution_text =
  "<p>" +
  "<a href='https://naip-usdaonline.hub.arcgis.com/' target='_blank'>U.S. National Agriculture Imagery Program</a>" +
  " | " +
  "<a href='https://openlayers.org/' target='_blank'> Openlayers </a>" +
  " | " +
  "<a href='https://oscarlewis.dev/' target='_blank'> Oscar Lewis </a>" +
  "</p>";

// Function to check the size of the map and collapse the attribution
function checkSize() {
  if (null !== vashonMap && undefined !== vashonMap) {
    // @ts-ignore: possibly undefined but already made sure vashonMap is defined
    const small = vashonMap.getSize()[0] < 600;
    attribution.setCollapsible(small);
    attribution.setCollapsed(small);
  }
}

// Home Button

/* Add additional Home control for going back to default view */
class HomeViewControl extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options: any) {
    const options = opt_options || {};

    // Create a new button with some text in it
    const button = document.createElement("button");
    button.innerHTML =
      "<img src=" +
      houseSVG +
      " style=\x22display: block; margin-left: auto; margin-right: auto;\x22\x22/>";

    // Create a div so we can style the button
    const element = document.createElement("div");
    element.className = "home-button ol-unselectable ol-control";
    element.appendChild(button);

    // Access and set properties on class
    super({
      element: element,
      target: options.target,
    });

    // Add the event listener
    button.addEventListener("click", this.handleHomeButton.bind(this), false);
  }

  // When the button is clicked than animate the view to it's initial state
  handleHomeButton() {
    let view = this.getMap()?.getView();
    view?.animate({
      center: initial_center,
      zoom: initial_zoom,
      duration: 250,
    });
  }
}

/*
 * Retireve and store the elements that make up the popup.
 */
const container = document.getElementById("popup")!;
const content = document.getElementById("popup-content")!;
const closer = document.getElementById("popup-closer")!;

/**
 * Create an overlay to anchor the popup to the map.
 * Autopan to that overlay so the popup is always visible on the map.
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

// Setup Vashon Coordinates
const vashoncoords: Coordinate = [-122.46005576724342, 47.42296763830496];
const vashonWebMercator: Coordinate = fromLonLat(vashoncoords);

// Create map view
const map_view = new View({
  center: vashonWebMercator,
  zoom: 12,
  minZoom: 11,

  // extent: [
  //   -13633746.066319598, 6010241.956326595, -13630636.034731245,
  //   6012535.06717515,
  // ],
  // constrainOnlyCenter: true,
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

// Create map base layer
const map_layers = [
  new TileLayer({
    source: new XYZ({
      url: "https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/USDA_CONUS_PRIME/ImageServer/tile/{z}/{y}/{x}",
      attributions: imagery_attribution_text,
    }),
  }),
];

// Create the map, not attached to a target
const vashonMap = new Map({
  controls: defaultControls({ attribution: false }).extend([
    attribution,
    new HomeViewControl({}),
  ]),
  layers: map_layers,
  overlays: [overlay],
  view: map_view,
});

// On size change run the checkSize function
vashonMap.on("change:size", checkSize);

const initial_zoom = vashonMap.getView().getZoom()!;
const initial_center = vashonMap.getView().getCenter();

// Set color for points on map
const color_cherry_coke = [168, 56, 0, 100];

/* Create a new point style for our dots on the map */
const point_style = new Style({
  image: new CircleStyle({
    radius: 3,
    fill: new Fill({ color: color_cherry_coke }),
    stroke: new Stroke({ color: "#000000", width: 0.5 }),
  }),
});

// Get feature geometry from spatialite.ts
const feature_geometry = await feature_collection;

/**
 * Add a click handler to the map to render the popup.
 */
vashonMap.on("singleclick", function (evt) {
  let feature = vashonMap.forEachFeatureAtPixel(
    evt.pixel,
    function (feature, layer) {
      if (layer.getClassName() == "vashonPoint") {
        return feature;
      }
    }
  );
  if (feature) {
    const coordinate = evt.coordinate;
    let popupContent = "<h1>" + feature.get("name") + "</h1>";
    content.innerHTML = popupContent;
    overlay.setPosition(coordinate);
  } else {
    overlay.setPosition(undefined);
  }
});

const setupMap = (node: HTMLDivElement) => {
  // Create map object
  vashonMap.setTarget(node.id);

  // Log for debug
  console.log("feature collection:");
  console.log(feature_geometry);

  // Create a new VectorSource in GeoJSON format
  // Reproject to WebMercator
  const vector_geoson = new VectorSource({
    features: new GeoJSON().readFeatures(feature_geometry, {
      dataProjection: "NAD83/Washington_North",
      featureProjection: vashonMap.getView().getProjection(),
    }),
  });

  const vashonPointsVectorLayer = new VectorLayer({
    className: "vashonPoint",
    source: vector_geoson,
    style: point_style,
  });

  // Add the layer to the map
  vashonMap.addLayer(vashonPointsVectorLayer);

  // vashonMap.getView().fit(vector_geoson.getExtent());
  checkSize();

  console.log(vashonMap.getAllLayers());
};

export default setupMap;

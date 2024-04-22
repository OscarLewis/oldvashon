import "../assets/map.css";
import houseSVG from "./house.svg";
import {
  Attribution,
  Control,
  defaults as defaultControls,
} from "ol/control.js";
import type { Coordinate } from "ol/coordinate";
import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import SPL from "spl.js";

// Spatialite
const db = await SPL().then((spl: any) => spl.db());

// Check to see if we can query the db
let sp_name: string = await db
  .exec("SELECT ? AS hello", ["spatialite"])
  .get.objs.then((results: any) => {
    return results[0].hello;
  })
  .catch((err: any) => console.log(err));

// get the version number
let sp_version: number = await db.exec("SELECT spatialite_version()").get.first;

// print to the console
console.log(sp_name + " version is: " + sp_version);

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
  constrainOnlyCenter: true,
});

// Create map layers
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
  view: map_view,
});

// On size change run the checkSize function
vashonMap.on("change:size", checkSize);

const initial_zoom = vashonMap.getView().getZoom()!;
const initial_center = vashonMap.getView().getCenter();

const setupMap = (node: HTMLDivElement) => {
  // Create map object
  vashonMap.setTarget(node.id);

  checkSize();
};

export default setupMap;

import "./style.css";
import setupMap from "./map";

let map_div = <HTMLDivElement>document.getElementById("map");
if (map_div != null && map_div != undefined) {
  setupMap(map_div);
}

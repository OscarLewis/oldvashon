import SPL from "spl.js";

let feature_collection = await (async () => {
  try {
    // Location of spatialite db
    let spatialite_db = "/oldvashon.sqlite";

    // make a new spl object
    let spl = await SPL().then((spl: any) => spl);

    // fetch the data
    let data = await fetch(spatialite_db).then((response) =>
      response.arrayBuffer()
    );

    // create a db from the data
    let db = await spl.db(data);

    // Print the local srid
    const srid = await db.exec("SELECT SRID(geom) FROM vashon_points").get
      .first;

    console.log("local srid is " + srid);

    // Get the features from the database
    let feature_collection = await db
      .exec("select name, author, geom as geometry from vashon_points")
      .get.objs.then((geoms: any[]) => {
        const collection = {
          type: "FeatureCollection",
          features: geoms.map((geoms) => ({
            type: "Feature",
            geometry: geoms.geometry,
            properties: { name: geoms.name, author: geoms.author },
          })),
        };
        return collection;
      });
    return feature_collection;
  } catch (err) {
    console.log(err);
  }
})();

export default feature_collection;

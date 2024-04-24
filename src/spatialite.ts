import SPL from "spl.js";

let query = "select * from vashon_points;";

let feature_collection = (async () => {
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

    // Get the features from the database
    let feature_collection = await db
      .exec(query)
      .get.objs.then((response: any[]) => {
        // Create GeoJSON style FeatureCollection
        console.log(response);
        const collection = {
          type: "FeatureCollection",
          features: response.map((response) => ({
            type: "Feature",
            geometry: response.geom,
            properties: {
              name: response.name,
              long_name: response.long_name,
              author: response.author,
              history: response.history,
              sumarry: response.sumarry,
              description: response.description,
              img_url: response.img_url,
              img_attribution: response.img_attribution,
              citations: response.citations,
              last_edited: response.last_edited,
              start_year: response.start_year,
              end_year: response.end_year,
            },
          })),
        };
        return collection;
      });

    // Return the feature collection
    return feature_collection;
  } catch (err) {
    console.log(err);
  }
})();

export default feature_collection;

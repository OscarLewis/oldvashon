import SPL from "spl.js";
(async () => {
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
    // spl.db(data);

    let db = await spl
      .mount("proj", [
        // Mounts proj.db required for transformation of EPSG 2285 to 3857.
        // Instead of downloading the entire db spl/sqlite will only fetch required db pages.
        {
          name: "proj.db",
          data: new URL(
            "../dist/proj/proj.db",
            window.location.href
          ).toString(),
        },
      ])
      .db(data);

    // Check the tables
    let tables = await db.exec(
      "SELECT * FROM sqlite_master where type='table';"
    ).get.objs;
    console.log(tables);

    // Check vashon_points table
    let vashon_points = await db.exec("SELECT * FROM vashon_points;").get.objs;
    console.log(vashon_points);

    // What's that srid?!
    const srid = await db.exec("SELECT SRID(geom) FROM vashon_points").get
      .first;

    console.log(srid);
  } catch (err) {
    console.log(err);
  }
})();

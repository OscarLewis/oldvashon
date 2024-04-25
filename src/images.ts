import { db } from "./spatialite";

export async function get_images_table() {
  console.log("Images from images table in sqlite file:");
  const images = await db
    .exec("SELECT * FROM images;")
    .get.objs.then((response: any[]) => {
      return response;
    });
  return images;
}

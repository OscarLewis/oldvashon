import { db } from "./spatialite";

export async function get_images_table(freature_id: number) {
  const images = await db
    .exec("SELECT * FROM images" + " WHERE feature_id == " + freature_id + ";")
    .get.objs.then((response: any[]) => {
      return response;
    });
  return images;
}

import { db } from "./spatialite";

export async function get_images_table() {
  console.log("Images from images table in sqlite file:");
  const images = await db
    .exec("SELECT * FROM images;")
    .get.objs.then((response: any[]) => {
      console.log(response);
      return response;
    });

  for (let i = 0; i < images.length; i++) {
    console.log(images[i].image_url);
  }
}

import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

const convertImages = async (dir: string) => {
  await imagemin(
    [`${dir}/*.{png,jpg,jpeg}`],
    {
      destination: dir,
      plugins: [imageminWebp({ quality: 75 })],
    },
  );
};

(async () => {
  await convertImages("assets");
  await convertImages("assets/timeline");
})();

import { API_KEY } from "@env";

const GOOGLE_MAPS_API = API_KEY;

export function getMapPreview(lat: number, long: number) {
  // const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAPS_API}`;
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${long}&key=${API_KEY}`;

  return imagePreviewUrl;
}

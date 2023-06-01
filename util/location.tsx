import { API_KEY } from "@env";
import { Coordinates } from "../types/NavigationTypes";

const GOOGLE_MAPS_API = API_KEY;

export function getMapPreview({ lat, lng }: Coordinates) {
  // const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAPS_API}`;
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=400x200&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;

  return imagePreviewUrl;
}

export async function getAddress({ lat, lng }: Coordinates) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();

  const address = data.results[0].formatted_address;
  console.log(address);
  return address;
}

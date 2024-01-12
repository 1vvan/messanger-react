import { BASE_API_IMG_URL } from "../constants/api-url";

export const defaultUserImage = "storage/avatars/default.png";

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = BASE_API_IMG_URL + defaultUserImage;
};

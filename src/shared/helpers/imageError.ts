import { BASE_API_URL } from "../constants/api-url";

export const defaultUserImage = `${BASE_API_URL}/uploads/profile-pictures/profile-placeholder.png`;

export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>
) => {
  event.currentTarget.src = defaultUserImage;
};

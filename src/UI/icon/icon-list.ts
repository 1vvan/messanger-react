import { ReactComponent as User } from "../../assets/icons/collection/user.svg";
import { ReactComponent as Settings } from "../../assets/icons/collection/settings.svg";

export const ICON_COLLECTION = {
  user: User,
  settings: Settings,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

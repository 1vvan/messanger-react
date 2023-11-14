import { ReactComponent as User } from "../../assets/icons/collection/user.svg";

export const ICON_COLLECTION = {
  user: User,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

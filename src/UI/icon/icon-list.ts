import { ReactComponent as User } from "../../assets/icons/collection/user.svg";
import { ReactComponent as Settings } from "../../assets/icons/collection/settings.svg";
import { ReactComponent as Cross } from "../../assets/icons/collection/cross.svg";

export const ICON_COLLECTION = {
  user: User,
  settings: Settings,
  cross: Cross,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

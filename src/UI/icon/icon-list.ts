import { ReactComponent as User } from "../../assets/icons/collection/user.svg";
import { ReactComponent as Settings } from "../../assets/icons/collection/settings.svg";
import { ReactComponent as Cross } from "../../assets/icons/collection/cross.svg";
import { ReactComponent as Logout } from "../../assets/icons/collection/logout.svg";
import { ReactComponent as SendIcon } from "../../assets/icons/collection/send.svg";
import { ReactComponent as ReadIcon } from "../../assets/icons/collection/read.svg";
import { ReactComponent as Logo } from "../../assets/icons/collection/logo-messager.svg";

export const ICON_COLLECTION = {
  user: User,
  settings: Settings,
  cross: Cross,
  logout: Logout,
  sendIcon: SendIcon,
  readIcon: ReadIcon,
  logo: Logo,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

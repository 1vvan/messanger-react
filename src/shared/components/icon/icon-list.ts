import { ReactComponent as Settings } from "../../shared/assets/icons/collection/settings.svg";
import { ReactComponent as Cross } from "../../shared/assets/icons/collection/cross.svg";
import { ReactComponent as Logout } from "../../shared/assets/icons/collection/logout.svg";
import { ReactComponent as SendIcon } from "../../shared/assets/icons/collection/send.svg";
import { ReactComponent as ReadIcon } from "../../shared/assets/icons/collection/read.svg";
import { ReactComponent as Logo } from "../../shared/assets/icons/collection/logo-messager.svg";
import { ReactComponent as Search } from "../../shared/assets/icons/collection/search.svg";
import { ReactComponent as Planet } from "../../shared/assets/icons/collection/planet.svg";
import { ReactComponent as Chat } from "../../shared/assets/icons/collection/chats.svg";
import { ReactComponent as Music } from "../../shared/assets/icons/collection/music.svg";
import { ReactComponent as Video } from "../../shared/assets/icons/collection/video.svg";
import { ReactComponent as Date } from "../../shared/assets/icons/collection/date.svg";
import { ReactComponent as Info } from "../../shared/assets/icons/collection/info.svg";

export const ICON_COLLECTION = {
  settings: Settings,
  cross: Cross,
  logout: Logout,
  sendIcon: SendIcon,
  readIcon: ReadIcon,
  logo: Logo,
  search: Search,
  planet: Planet,
  chat: Chat,
  music: Music,
  video: Video,
  date: Date,
  info: Info,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

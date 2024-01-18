import { ReactComponent as Settings } from "../../assets/icons/collection/settings.svg";
import { ReactComponent as Cross } from "../../assets/icons/collection/cross.svg";
import { ReactComponent as Logout } from "../../assets/icons/collection/logout.svg";
import { ReactComponent as SendIcon } from "../../assets/icons/collection/send.svg";
import { ReactComponent as ReadIcon } from "../../assets/icons/collection/read.svg";
import { ReactComponent as Logo } from "../../assets/icons/collection/logo-messager.svg";
import { ReactComponent as Search } from "../../assets/icons/collection/search.svg";
import { ReactComponent as Planet } from "../../assets/icons/collection/planet.svg";
import { ReactComponent as Chat } from "../../assets/icons/collection/chats.svg";
import { ReactComponent as Music } from "../../assets/icons/collection/music.svg";
import { ReactComponent as Video } from "../../assets/icons/collection/video.svg";
import { ReactComponent as Date } from "../../assets/icons/collection/date.svg";
import { ReactComponent as Info } from "../../assets/icons/collection/info.svg";
import { ReactComponent as Clip } from "../../assets/icons/collection/clip.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/collection/arrow-left.svg";
import { ReactComponent as Mute } from "../../assets/icons/collection/mute.svg";

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
  clip: Clip,
  arrowLeft: ArrowLeft,
  mute: Mute,
};

type Keys = keyof typeof ICON_COLLECTION;
export type IconCollectionType = (typeof ICON_COLLECTION)[Keys];

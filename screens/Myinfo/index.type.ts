import { AlertButton } from "react-native";
import { Manager } from "../../models";

export type Props = {
  data: null | Manager;
  SHOP_SQ?: null | number;
  MNG_SQ?: null | number;
  alert: (title: string, text: string, buttons?: AlertButton[]) => void;
  getData: () => void;
};

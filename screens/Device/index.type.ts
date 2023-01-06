export type ButtonProps = {
  dir: "left" | "right";
};
export type ButtonsProps = {
  navigate: any;
  DEVICE_SQ: number | null;
};
export type DeviceImgBoxProps = {
  IS_ACTIVE: boolean;
  GAS_VAL?: number;
  MDL_IMG_NM?: string;
  DEVICE_NM?: string;
};
export type DefaultBoxProps = {
  MDL_NM?: string;
  DEVICE_SN?: string;
  DEVICE_BUY_DT?: string;
  DEVICE_INSTL_DT?: string;
};
export type UseBoxProps = {
  UDD_VAL?: number;
  ON_COUNT?: number;
  DEVICE_LAST_DT?: string;
};
export type VersionBoxProps = {
  DEVICE_SW_VN?: string;
  DEVICE_FW_VN?: string;
};

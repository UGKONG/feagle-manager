// Yes Or No
export type IsYes = 0 | 1;

// 성별
export type Gender = 1 | 2;

// 운영체제
export type Os = "android" | "ios" | "web";

// 유저 정보 (매니저)
export type User = {
  MNG_SQ: number;
  MNG_NM: string;
  MNG_NUM: string;
  MNG_GD: number;
  MNG_ID: string;
  SHOP_SQ: number;
  SHOP_NM: string;
  OS: Os;
  UUID: string;
};

// 피부샵 정보
export type Shop = {
  SHOP_SQ: number;
  SHOP_NM: string;
  SHOP_NUM: string;
  SHOP_ADD: string;
  SHOP_ADD_DTL: string;
  IS_DEL: IsYes;
  MNG?: Manager;
  DEVICE?: DeviceList[];
};

// 매니저 정보
export type Manager = {
  MNG_SQ: number;
  MNG_NM: string;
  MNG_NUM: string;
  MNG_GD: Gender;
  MNG_ID: string;
  OS: Os;
  UUID: string;
  SHOP_SQ?: number;
  SHOP_NM?: string;
  SHOP_NUM?: string;
  SHOP_ADD?: string;
  SHOP_ADD_DTL?: string;
};

// 장비 리스트
export type DeviceList = {
  DEVICE_SQ: number;
  MDL_SQ: number;
  MDL_NM: string;
  MDL_EN_NM: string;
  MDL_DESC: string;
  MDL_IMG_NM?: string;
  SHOP_SQ: number;
  SHOP_NM: string;
  DEVICE_SN: string;
  DEVICE_NM: string;
  DEVICE_SW_VN: string;
  DEVICE_FW_VN: string;
  DEVICE_BUY_DT: string;
  DEVICE_INSTL_DT: string;
  USE_TM_VAL: number;
  GAS_VAL: number;
  IS_ACTIVE: IsYes;
  ON_COUNT: number;
  DEVICE_LAST_DT: string;
  PLA_VAL: number;
};

// 장비 히스토리
export type DeviceHistory = {
  UDD_SQ: number;
  UDD_TXT: string;
  UDD_CRT_DT: string;
};

// 장비 상세정보
export type DeviceDetail = {
  DEVICE_SQ: number;
  MDL_SQ: number;
  MDL_NM: string;
  MDL_EN_NM: string;
  MDL_DESC: string;
  MDL_IMG_NM?: string;
  SHOP_SQ: number;
  SHOP_NM: string;
  SHOP_NUM: string;
  SHOP_ADD: string;
  SHOP_ADD_DTL: string;
  DEVICE_SN: string;
  DEVICE_NM: string;
  DEVICE_SW_VN: string;
  DEVICE_FW_VN: string;
  DEVICE_BUY_DT: string;
  DEVICE_INSTL_DT: string;
  UDD_VAL: number;
  IS_ACTIVE: IsYes;
  ON_COUNT: number;
  DEVICE_LAST_DT: string;
  PLA_VAL: number;
  GAS_VAL: number;
  GAS1_VAL: number;
  GAS2_VAL: number;
  HISTORY: DeviceHistory[];
};

// 파일 리스트
export type File = {
  FILE_SQ: number;
  FILE_PATH: string;
  FILE_HASH_NM: string;
  FILE_NM: string;
  FILE_SZ: number;
  FILE_EXT: string;
};

// 자료 리스트
export type Post = {
  POST_SQ: number;
  POST_TP: number;
  POST_TP_NM: string;
  MDL_SQ: number;
  MDL_NM: string;
  MDL_EN_NM: string;
  MDL_DESC: string;
  BUILD_VN: string;
  POST_TTL: string;
  POST_CN: string;
  MST_SQ: number;
  MST_NM: string;
  BUILD_DT: string;
  POST_CRT_DT: string;
  FILE_CNT?: number;
  FILE_LIST?: File[];
};

// 가스 요청 정보
export type GasRequest = {
  GR_SQ: number;
  SHOP_SQ: number;
  SHOP_NM: string;
  IS_CHK: IsYes;
  GR_MOD_DT: string;
  GR_CRT_DT: string;
};

import type { Os, User } from "../models";

export type Dispatch = {
  type: keyof Store;
  payload: any;
};

export type Store = {
  isScreenChange: number;
  os: null | Os;
  user: null | User;
  gasRequest: null | ((callback?: () => void) => void);
};

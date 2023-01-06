import { useMemo } from "react";
import HomeStack from "../stacks/Home";
import ModeStack from "../stacks/Mode";
import GasStack from "../stacks/Gas";
import MyinfoStack from "../stacks/Myinfo";
import PostStack from "../stacks/Post";

type Memo = {
  id: number;
  name: string;
  component: () => JSX.Element;
  drawerLabel: string;
};

const useScreen = (): Memo[] => {
  const memo = useMemo<Memo[]>(
    () => [
      {
        id: 1,
        name: "Home",
        component: HomeStack,
        drawerLabel: "홈",
      },
      {
        id: 2,
        name: "Mode",
        component: ModeStack,
        drawerLabel: "프로그램 모드 사용방법",
      },
      {
        id: 3,
        name: "Gas",
        component: GasStack,
        drawerLabel: "가스 신청 내역",
      },
      {
        id: 4,
        name: "Post",
        component: PostStack,
        drawerLabel: "자료",
      },
      {
        id: 5,
        name: "Myinfo",
        component: MyinfoStack,
        drawerLabel: "내정보",
      },
    ],
    [HomeStack, ModeStack, GasStack, PostStack, MyinfoStack]
  );

  return memo;
};

export default useScreen;

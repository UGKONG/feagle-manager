import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { Platform, Text } from "react-native";
import http from "./functions/http";
import useScreen from "./hooks/useNavigation";
import Modal from "./layouts/Modal";
import LoginScreen from "./screens/Login";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./store/index.type";

const Drawer = createDrawerNavigator();
const OS = Platform.OS;

const Init = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((x: Store) => x?.user);
  const isScreenChange = useSelector((x: Store) => x?.isScreenChange);
  const screens = useScreen();

  // 로그인 여부 확인
  const loginCheck = (): void => {
    http.get("/common/session").then(({ data }) => {
      if (!data?.result) return dispatch({ type: "user", payload: null });
      dispatch({ type: "user", payload: data?.current });
    });
  };

  // 앱 초기화 (기본정보 저장)
  const init = (): void => {
    const icon = OS === "android" ? "🇰🇷" : "🇺🇸";
    const result = `${icon} ${OS} Reloaded`;
    console.log(result);

    dispatch({ type: "os", payload: OS });
    loginCheck();
  };

  // 페이지 전환
  const changeScreen = () => {
    dispatch({ type: "isScreenChange", payload: isScreenChange + 1 });
  };

  useEffect(init, []);

  return (
    <>
      <NavigationContainer onStateChange={changeScreen}>
        <Drawer.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
        >
          {screens?.map((item) => (
            <Drawer.Screen
              key={item?.id}
              name={item?.name}
              component={item?.component}
              options={{ drawerLabel: item?.drawerLabel }}
            />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
      <Modal visible={user ? false : true}>
        <LoginScreen />
      </Modal>
    </>
  );
};

export default Init;

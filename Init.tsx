import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import http from "./functions/http";
import useNavigation from "./hooks/useNavigation";
import Modal from "./layouts/Modal";
import LoginScreen from "./screens/Login";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./store/index.type";
import PushNotificationIOS, {
  PushNotification,
  PushNotificationPermissions,
} from "@react-native-community/push-notification-ios";
import SplashScreen from "react-native-splash-screen";

const Drawer = createDrawerNavigator();
const OS = Platform.OS;

const Init = (): JSX.Element => {
  const dispatch = useDispatch();
  const screens = useNavigation();
  const user = useSelector((x: Store) => x?.user);
  const isScreenChange = useSelector((x: Store) => x?.isScreenChange);
  const gasRequest = useSelector((x: Store) => x?.gasRequest);

  // 푸쉬알림
  const onRemoteNotification = (notification: PushNotification) => {
    if (gasRequest) gasRequest();

    const result = PushNotificationIOS.FetchResult.NoData;
    notification.finish(result);
  };

  // 로그인 여부 확인
  const loginCheck = (): void => {
    http.get("/common/session").then(({ data }) => {
      if (!data?.result) return dispatch({ type: "user", payload: null });
      dispatch({ type: "user", payload: data?.current });
    });
  };

  // 푸쉬 권한 얻기
  const iosRequestPermissions = (): void => {
    PushNotificationIOS.checkPermissions((res: PushNotificationPermissions) => {
      if (res?.alert) return;

      PushNotificationIOS.requestPermissions({
        alert: true,
        badge: true,
        sound: true,
      });
    });
  };

  // 앱 초기화 (기본정보 저장)
  const init = (): void => {
    SplashScreen.hide();
    if (OS === "ios") iosRequestPermissions();

    const icon = OS === "android" ? "🇰🇷" : "🇺🇸";
    const result = `${icon} ${OS} Reloaded!`;
    console.log(result);

    dispatch({ type: "os", payload: OS });
    loginCheck();
  };

  // 페이지 전환
  const changeScreen = () => {
    dispatch({ type: "isScreenChange", payload: isScreenChange + 1 });
  };

  useEffect(init, []);
  useEffect(() => {
    PushNotificationIOS.addEventListener("notification", onRemoteNotification);
    PushNotificationIOS.addEventListener(
      "localNotification",
      onRemoteNotification
    );
    return () => {
      PushNotificationIOS.removeEventListener("notification");
      PushNotificationIOS.removeEventListener("localNotification");
    };
  });

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

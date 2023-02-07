import messaging from "@react-native-firebase/messaging";
import { registerRootComponent } from "expo";
import useIosPush from "./hooks/useIosPush";
import useAndroidPush from "./hooks/useAndroidPush";
import App from "./App";

const OS = Platform.OS;

// 백그라운드에서 푸쉬
messaging().setBackgroundMessageHandler(async ({ notification }) => {
  const iosPush = useIosPush();
  const androidPush = useAndroidPush();
  if (!notification) return;
  const { title, body } = notification;
  (OS === "ios" ? iosPush : androidPush)(title, body);
});

registerRootComponent(App);

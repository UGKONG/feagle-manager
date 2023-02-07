import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as SplashScreenIOS from "expo-splash-screen";
import Init from "./Init";
import store from "./store";
import { useEffect } from "react";
import PushNotification from "react-native-push-notification";
import SplashScreen from "react-native-splash-screen";

const notificationOptions = {
  popInitialNotification: true,
  requestPermissions: true,
};
const channelOptions = { channelId: "push", channelName: "push" };

PushNotification.configure(notificationOptions);
PushNotification.createChannel(channelOptions, () => {});

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreenIOS.hideAsync()
      .then(() => {})
      .catch(() => {});
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} />
      <Init />
    </Provider>
  );
};

export default App;

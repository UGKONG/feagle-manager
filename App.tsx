import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import Init from "./Init";
import store from "./store";
import { useEffect } from "react";
import PushNotification, { Importance } from "react-native-push-notification";

PushNotification.configure({
  popInitialNotification: true,
  requestPermissions: true,
});
PushNotification.createChannel(
  {
    channelId: "push",
    channelName: "push",
  },
  (created) => console.log(created)
);

SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={"dark-content"} />
      <Init />
    </Provider>
  );
};

export default App;

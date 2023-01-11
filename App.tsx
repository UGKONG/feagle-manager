import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import Init from "./Init";
import store from "./store";
import { useEffect } from "react";

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

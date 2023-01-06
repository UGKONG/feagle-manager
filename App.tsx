import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import Init from "./Init";
import store from "./store";

const App = (): JSX.Element => (
  <Provider store={store}>
    <StatusBar barStyle={"default"} />
    <Init />
  </Provider>
);

export default App;

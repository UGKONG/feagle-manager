import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeviceScreen from "../screens/Device";
import HomeScreen from "../screens/Home";
import UseScreen from "../screens/Use";
import ChartScreen from "../screens/Chart";

const Stack = createNativeStackNavigator();

const HomeStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerBackButtonMenuEnabled: true }}
      />
      <Stack.Screen
        name="DeviceScreen"
        component={DeviceScreen}
        options={{ headerBackTitle: "뒤로가기" }}
      />
      <Stack.Screen
        name="ChartScreen"
        component={ChartScreen}
        options={{ headerBackTitle: "뒤로가기" }}
      />
      <Stack.Screen
        name="UseScreen"
        component={UseScreen}
        options={{ headerBackTitle: "뒤로가기" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

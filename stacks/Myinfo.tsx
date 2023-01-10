import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyinfoScreen from "../screens/Myinfo";

const Stack = createNativeStackNavigator();

const MyinfoStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="MyinfoScreen">
      <Stack.Screen name="MyinfoScreen" component={MyinfoScreen} />
    </Stack.Navigator>
  );
};

export default MyinfoStack;

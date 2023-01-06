import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModeScreen from "../screens/Mode";

const Stack = createNativeStackNavigator();

const ModeStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ModeScreen" component={ModeScreen} />
    </Stack.Navigator>
  );
};

export default ModeStack;

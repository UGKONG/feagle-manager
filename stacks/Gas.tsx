import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import GasScreen from "../screens/Gas";

const Stack = createNativeStackNavigator();

const GasStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GasScreen" component={GasScreen} />
    </Stack.Navigator>
  );
};

export default GasStack;

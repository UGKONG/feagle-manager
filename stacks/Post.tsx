import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "../screens/Post";
import PostDetailScreen from "../screens/PostDetail";

const Stack = createNativeStackNavigator();

const PostStack = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="PostScreen">
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen
        name="PostDetailScreen"
        component={PostDetailScreen}
        options={{ headerBackTitle: "뒤로가기" }}
      />
    </Stack.Navigator>
  );
};

export default PostStack;

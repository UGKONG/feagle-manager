import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "../functions/http";
import { useDispatch } from "react-redux";

const HeaderRight = (): JSX.Element => {
  const dispatch = useDispatch();

  const logout = (): void => {
    http.get("/common/logout").then(() => {
      AsyncStorage.removeItem("MNG").then(() => {
        dispatch({ type: "user", payload: null });
      });
    });
  };

  const click = (): void => {
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
      { text: "예", onPress: logout },
      { text: "아니요" },
    ]);
  };

  return (
    <Container onPress={click}>
      <Icon />
    </Container>
  );
};

export default HeaderRight;

const Container = styled.TouchableOpacity``;
const Icon = styled(Ionicons).attrs(() => ({
  name: "log-out-outline",
  color: "#444444",
  size: 26,
}))`
  padding: 3px 0 3px 3px;
`;

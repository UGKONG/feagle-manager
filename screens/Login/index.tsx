import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import http from "../../functions/http";
import _Container from "../../layouts/Container";
import _Button from "../../layouts/Button";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "../../layouts/Modal";
import FindModal from "./FindModal";
import sha256 from "sha256";
import messaging from "@react-native-firebase/messaging";

const OS = Platform.OS;
type Form = {
  MNG_ID: string;
  MNG_PW: string;
  OS: "ios" | "android" | "windows" | "macos" | "web";
  UUID: string;
};

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const idRef = useRef<TextInput>(null);
  const pwRef = useRef<TextInput>(null);
  const [isFindModal, setIsFindModal] = useState<boolean>(false);
  const [MNG_ID, setMNG_ID] = useState<string>("");
  const [MNG_PW, setMNG_PW] = useState<string>("");
  const [IS_AUTO_LOGIN, setIS_AUTO_LOGIN] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [UUID, setUUID] = useState<string>("");

  // 로그인 유지 (로그인 정보 저장)
  const loginSave = (saveData: Form) => {
    AsyncStorage.setItem("MNG", JSON.stringify(saveData));
  };

  // 로그인 정보 전송
  const submit = (currentForm?: Form): void => {
    setIsPending(true);

    const form: Form = {
      MNG_ID: currentForm?.MNG_ID ?? MNG_ID,
      MNG_PW: currentForm?.MNG_PW ?? sha256(MNG_PW),
      OS,
      UUID,
    };

    http
      .post("/manager/login", form)
      .then(({ data }) => {
        if (!data?.result) {
          if (idRef?.current) idRef?.current?.focus();
          return Alert.alert("로그인", "계정 정보가 없습니다.", undefined, {
            cancelable: true,
          });
        }
        dispatch({ type: "user", payload: data?.current });

        if (IS_AUTO_LOGIN) loginSave(form);
      })
      .catch(() => {
        Alert.alert("로그인", "계정 정보가 없습니다.", undefined, {
          cancelable: true,
        });
      })
      .finally(() => setIsPending(false));
  };

  // 로그인 유효성 검사
  const validate = (): void => {
    if (!MNG_ID) {
      if (idRef?.current) idRef?.current?.focus();
      return;
    }
    if (!MNG_PW) {
      if (pwRef?.current) pwRef?.current?.focus();
      return;
    }

    submit();
  };

  // 체크박스 클릭
  const checkChange = () => {
    setIS_AUTO_LOGIN((prev) => {
      if (!prev) AsyncStorage.removeItem("MNG");
      return !prev;
    });
  };

  useEffect(() => {
    messaging()
      .getToken()
      .then(setUUID)
      .catch(() => setUUID(""));
  }, []);

  useEffect(() => {
    if (!UUID) return;

    AsyncStorage.getItem("MNG").then((MNG) => {
      if (!MNG) return;
      let json: Form = JSON.parse(MNG);
      submit(json);
    });
  }, [UUID]);

  return (
    <>
      <Container>
        <Form onPress={Keyboard.dismiss}>
          <Logo />
          <Input
            ref={idRef}
            placeholder="아이디를 입력해주세요."
            value={MNG_ID}
            onChangeText={setMNG_ID}
            returnKeyType={"next"}
            onSubmitEditing={() => {
              if (pwRef?.current) pwRef?.current?.focus();
            }}
          />
          <Input
            ref={pwRef}
            placeholder="패스워드를 입력해주세요."
            value={MNG_PW}
            onChangeText={setMNG_PW}
            secureTextEntry={true}
            returnKeyType={"send"}
            onSubmitEditing={validate}
          />
          <Options>
            <Touch onPress={checkChange}>
              <CheckBox checked={IS_AUTO_LOGIN} />
              <GrayText isActive={IS_AUTO_LOGIN}>로그인유지</GrayText>
            </Touch>
            <Find>
              <Touch onPress={() => setIsFindModal(true)}>
                <GrayText>아이디 및 패스워드 찾기</GrayText>
              </Touch>
            </Find>
          </Options>
        </Form>
        <Button onPress={validate} readOnly={isPending}>
          {isPending ? (
            <ActivityIndicator
              size={"small"}
              color={"#fff"}
              style={{ paddingTop: 5 }}
            />
          ) : (
            "로 그 인"
          )}
        </Button>
      </Container>

      {/* 아이디 찾기 모달 */}
      <Modal visible={isFindModal}>
        <FindModal close={() => setIsFindModal(false)} />
      </Modal>
    </>
  );
};

export default LoginScreen;

const Container = styled(_Container.View)``;
const Form = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  width: 100%;
  max-width: 500px;
`;
const Logo = styled.Image.attrs(() => ({
  source: require("../../assets/logo.png"),
  resizeMode: "contain",
}))`
  width: 250px;
  margin-bottom: 50px;
`;
const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f7f8ff;
  margin-bottom: 10px;
  padding: 0 10px;
`;
const Options = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Find = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Touch = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  padding: 2px;
  margin: 0 2px;
  flex-direction: row;
  align-items: center;
`;
const CheckBox = styled(Icon).attrs(() => ({
  name: "checkmark-sharp",
  size: 24,
}))<{ checked: boolean }>`
  margin-right: 4px;
  color: ${(x) => (x?.checked ? "#7743df" : "#aaa")};
`;
const GrayText = styled.Text<{ isActive?: boolean }>`
  color: ${(x) => (x?.isActive ? "#7743df" : "#aaa")};
  font-weight: ${(x) => (x?.isActive ? 700 : 400)};
`;
const Button = styled(_Button)`
  width: 100%;
  height: 46px;
  align-items: center;
  justify-content: center;
`;

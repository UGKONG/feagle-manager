import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Alert, Keyboard, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from "styled-components/native";
import http from "../../functions/http";
import _Container from "../../layouts/Container";
import _Button from "../../layouts/Button";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "../../layouts/Modal";
import Title from "../../layouts/Title";
import FindModal from "./FindModal";
import sha256 from "sha256";

const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const idRef = useRef<TextInput>(null);
  const pwRef = useRef<TextInput>(null);
  const [isFindModal, setIsFindModal] = useState<boolean>(false);
  const [MNG_ID, setMNG_ID] = useState<string>("");
  const [MNG_PW, setMNG_PW] = useState<string>("");
  const [IS_AUTO_LOGIN, setIS_AUTO_LOGIN] = useState<boolean>(false);

  // 로그인 유지 (로그인 정보 저장)
  const loginSave = () => {
    AsyncStorage.setItem("MNG", JSON.stringify({ MNG_ID, MNG_PW }));
  };

  // 로그인 정보 전송
  const submit = (id?: string, pw?: string): void => {
    const form = { MNG_ID: id ?? MNG_ID, MNG_PW: sha256(pw ?? MNG_PW) };
    http
      .post("/manager/login", form)
      .then(({ data }) => {
        if (!data?.result) {
          if (idRef?.current) idRef?.current?.focus();
          return Alert.alert("로그인", "계정 정보가 없습니다.", undefined, {
            cancelable: true,
          });
        }
        if (dispatch) dispatch({ type: "user", payload: data?.current });

        if (IS_AUTO_LOGIN) loginSave();
      })
      .catch(() => {
        Alert.alert("로그인", "계정 정보가 없습니다.", undefined, {
          cancelable: true,
        });
      });
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
    AsyncStorage.getItem("MNG").then((MNG) => {
      if (!MNG) return;
      let json = JSON.parse(MNG);
      submit(json?.MNG_ID ?? "", json?.MNG_PW ?? "");
    });
  }, []);

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
        <Button onPress={validate}>로 그 인</Button>
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
`;
const FindModalContainer = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  flex: 1;
  padding: 10px;
`;
const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 50px;
  padding: 20px 0;
`;
const Row = styled.View`
  margin-bottom: 40px;
  width: 100%;
`;
const RowTitle = styled.Text`
  margin-bottom: 4px;
  font-size: 16px;
  flex: 1;
`;
const FindBtnContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
const FindBtn = styled(_Button)`
  flex: 1;
  max-width: 50%;
`;

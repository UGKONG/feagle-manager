import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, AlertButton, Keyboard, TextInput } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "../../layouts/Modal";
import _Button from "../../layouts/Button";
import _Container from "../../layouts/Container";
import Title from "../../layouts/Title";
import http from "../../functions/http";
import { Store } from "../../store/index.type";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  visible: boolean;
  close: () => void;
};

const PwModal = ({ visible, close }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((x: Store) => x?.user);
  const prevPwRef = useRef<TextInput>(null);
  const nextPw1Ref = useRef<TextInput>(null);
  const nextPw2Ref = useRef<TextInput>(null);
  const [prevPw, setPrevPw] = useState<string>("");
  const [nextPw1, setNextPw1] = useState<string>("");
  const [nextPw2, setNextPw2] = useState<string>("");

  // 초기화
  const reset = (): void => {
    if (!visible) return;
    if (prevPwRef?.current) prevPwRef?.current?.focus();
    setPrevPw("");
    setNextPw1("");
    setNextPw2("");
  };

  // MNG_SQ
  const MNG_SQ = useMemo<null | number>(() => {
    if (!user?.MNG_SQ) return null;
    return user?.MNG_SQ;
  }, [user]);

  // 알림 띄우기
  const alert = (
    title: string,
    text: string,
    buttons?: AlertButton[]
  ): void => {
    Alert.alert(title, text, buttons, { cancelable: true });
  };

  // 패스워드 변경 요청
  const submit = (): void => {
    const form = { PREV_PW: prevPw, NEXT_PW: nextPw1 };
    http.put("/manager/changePw/" + MNG_SQ, form).then(({ data }) => {
      const msg = data?.message ?? "패스워드 변경에 실패하였습니다.";
      if (!data?.result) {
        if (prevPwRef?.current) prevPwRef?.current?.focus();
        setPrevPw("");
        return alert("패스워드 변경", msg);
      }

      alert(
        "패스워드 변경",
        "패스워드가 변경되었습니다.\n다시 로그인 해주세요."
      );
      AsyncStorage.removeItem("MNG");
      http.get("/common/logout").then(() => {
        dispatch({ type: "user", payload: null });
        close();
      });
    });
  };

  // 패스워드 유효성 검사
  const validate = (): void => {
    if (!MNG_SQ) return;

    if (!prevPw) {
      if (prevPwRef?.current) prevPwRef?.current?.focus();
      return;
    }
    if (!nextPw1) {
      if (nextPw1Ref?.current) nextPw1Ref?.current?.focus();
      return;
    }
    if (!nextPw2) {
      if (nextPw2Ref?.current) nextPw2Ref?.current?.focus();
      return;
    }
    if (nextPw1 !== nextPw2) {
      if (nextPw2Ref?.current) nextPw2Ref?.current?.focus();
      setNextPw2("");
      return;
    }

    submit();
  };

  useEffect(reset, [visible]);

  return (
    <Modal visible={visible}>
      <Container>
        <Header>
          <CloseBtn onPress={close}>
            <CloseBtnText>닫기</CloseBtnText>
            <CloseIcon />
          </CloseBtn>
        </Header>

        <Form onPress={Keyboard.dismiss}>
          <Section>
            <Title title="패스워드 변경" />
            <Input
              ref={prevPwRef}
              placeholder="현재 패스워드를 입력해주세요."
              value={prevPw}
              returnKeyType={"next"}
              onChangeText={setPrevPw}
              secureTextEntry={true}
              onSubmitEditing={() => {
                if (nextPw1Ref?.current) nextPw1Ref?.current?.focus();
              }}
            />
            <Input
              ref={nextPw1Ref}
              placeholder="변경할 패스워드를 입력해주세요."
              returnKeyType={"next"}
              value={nextPw1}
              onChangeText={setNextPw1}
              secureTextEntry={true}
              onSubmitEditing={() => {
                if (nextPw2Ref?.current) nextPw2Ref?.current?.focus();
              }}
            />
            <Input
              ref={nextPw2Ref}
              placeholder="변경할 패스워드를 다시 입력해주세요."
              returnKeyType={"send"}
              value={nextPw2}
              onChangeText={setNextPw2}
              secureTextEntry={true}
              onSubmitEditing={() => nextPw2 && validate()}
            />
            <Button onPress={validate}>변 경</Button>
          </Section>
        </Form>
      </Container>
    </Modal>
  );
};

export default PwModal;

const Container = styled(_Container.Scroll)``;
const Header = styled.View`
  align-items: flex-end;
  margin-bottom: 20px;
`;
const CloseIcon = styled(Icon).attrs(() => ({
  name: "arrow-down-outline",
  size: 24,
}))`
  margin-left: 5px;
  color: #666666;
`;
const CloseBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  padding: 5px;
  flex-direction: row;
  align-items: center;
  color: #666666;
`;
const CloseBtnText = styled.Text`
  color: #666666;
`;
const Form = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  flex: 1;
  width: 100%;
  max-width: 500px;
`;
const Section = styled.View`
  margin-bottom: 50px;
`;
const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f7f8ff;
  margin-top: 10px;
  padding: 0 10px;
`;
const Button = styled(_Button)`
  flex: 1;
  margin-top: 10px;
`;

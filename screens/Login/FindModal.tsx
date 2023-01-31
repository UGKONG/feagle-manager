import { useRef, useState } from "react";
import { Alert, AlertButton, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components/native";
import _Container from "../../layouts/Container";
import Title from "../../layouts/Title";
import _Button from "../../layouts/Button";
import type { FindModalProps } from "./index.type";
import Icon from "react-native-vector-icons/Ionicons";
import { usePhoneNumber } from "../../functions/utils";
import http from "../../functions/http";
import * as Clipboard from "expo-clipboard";

const FindModal = ({ close }: FindModalProps): JSX.Element => {
  const idNameRef = useRef<TextInput>(null);
  const idNumRef = useRef<TextInput>(null);
  const idRef = useRef<TextInput>(null);
  const pwNameRef = useRef<TextInput>(null);
  const pwNumRef = useRef<TextInput>(null);
  const [name, setName] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [id, setId] = useState<string>("");

  // 알림 띄우기
  const alert = (
    title: string,
    text: string,
    buttons?: AlertButton[]
  ): void => {
    Alert.alert(title, text, buttons, { cancelable: true });
  };

  // 복사
  const copy = (text: string): void => {
    Clipboard.setStringAsync(text)
      .then(() => {})
      .catch(() => {});
  };

  // 아이디 찾기
  const findIdSubmit = (): void => {
    const form = { MNG_NM: name, MNG_NUM: num };
    http.post("/manager/findId", form).then(({ data }) => {
      if (!data?.result || !data?.current) {
        return alert("아이디 찾기", "가입된 계정이 아닙니다.");
      }

      const result = data?.current;
      setId(result);
      alert("아이디 찾기", "가입된 아이디는 " + result + "입니다.", [
        { text: "복사하기", onPress: () => copy(result) },
        { text: "닫기", style: "cancel" },
      ]);
    });
  };

  // 비밀번호 찾기
  const findPwSubmit = (): void => {
    const form = { MNG_NM: name, MNG_NUM: num, MNG_ID: id };
    http.post("/manager/findPw", form).then(({ data }) => {
      if (!data?.result || !data?.current) {
        return alert("패스워드 찾기", "가입된 계정이 아닙니다.");
      }

      const result = data?.current;

      alert(
        "패스워드 찾기",
        "임시 패스워드가 복사되었습니다.\n로그인 후 패스워드를 변경해주세요."
      );
      copy(result);
    });
  };

  // 아이디 찾기 유효성 검사
  const findIdValidate = (): void => {
    if (!name) {
      if (idNameRef?.current) idNameRef?.current?.focus();
      return;
    }
    if (!num) {
      if (idNumRef?.current) idNumRef?.current?.focus();
      return;
    }

    findIdSubmit();
  };

  // 비밀번호 찾기 유효성 검사
  const findPwValidate = (): void => {
    if (!name) {
      if (pwNameRef?.current) pwNameRef?.current?.focus();
      return;
    }
    if (!num) {
      if (pwNumRef?.current) pwNumRef?.current?.focus();
      return;
    }
    if (!id) {
      if (idRef?.current) idRef?.current?.focus();
      return;
    }

    findPwSubmit();
  };

  return (
    <Container>
      <Header>
        <CloseBtn onPress={close}>
          <CloseBtnText>닫기</CloseBtnText>
          <CloseIcon />
        </CloseBtn>
      </Header>

      <Form onPress={Keyboard.dismiss}>
        {/* 아이디 찾기 */}
        <Section>
          <Title title="아이디 찾기" />
          <Input
            ref={idNameRef}
            placeholder="이름을 입력해주세요."
            value={name}
            returnKeyType={"next"}
            onChangeText={setName}
            onSubmitEditing={() => {
              if (idNumRef?.current) idNumRef?.current?.focus();
            }}
          />
          <Input
            ref={idNumRef}
            placeholder="연락처을 입력해주세요. ( - 제외)"
            keyboardType="number-pad"
            returnKeyType="send"
            value={num}
            onChangeText={(num) => setNum(usePhoneNumber(num))}
            onSubmitEditing={() => num && findIdValidate}
          />
          <Button onPress={findIdValidate}>찾 기</Button>
        </Section>

        {/* 패스워드 찾기 */}
        <Section>
          <Title title="패스워드 찾기" />
          <Input
            ref={pwNameRef}
            placeholder="이름을 입력해주세요."
            value={name}
            returnKeyType={"next"}
            onChangeText={setName}
            onSubmitEditing={() => {
              if (pwNumRef?.current) pwNumRef?.current?.focus();
            }}
          />
          <Input
            ref={pwNumRef}
            placeholder="연락처을 입력해주세요. ( - 제외)"
            keyboardType="number-pad"
            returnKeyType={"next"}
            value={num}
            onChangeText={(num) => setNum(usePhoneNumber(num))}
            onSubmitEditing={() => {
              if (idRef?.current) idRef?.current?.focus();
            }}
          />
          <Input
            ref={idRef}
            placeholder="아이디를 입력해주세요."
            returnKeyType={"send"}
            value={id}
            onChangeText={setId}
            onSubmitEditing={() => id && findPwValidate()}
          />
          <Button onPress={findPwValidate}>찾 기</Button>
        </Section>
      </Form>
    </Container>
  );
};

export default FindModal;

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

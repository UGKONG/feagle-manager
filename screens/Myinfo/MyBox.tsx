import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import http from "../../functions/http";
import { usePhoneNumber } from "../../functions/utils";
import { Manager } from "../../models";
import { Store } from "../../store/index.type";
import {
  Content,
  EditBtn,
  EditBtnText,
  EditIcon,
  Input,
  Section,
  SectionTitle,
  Text,
} from "./index.style";
import { Props } from "./index.type";

const MyBox = ({ data, MNG_SQ, alert, getData }: Props): JSX.Element => {
  const nameRef = useRef<TextInput>(null);
  const numRef = useRef<TextInput>(null);
  const isScreenChange = useSelector((x: Store) => x?.isScreenChange);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editData, setEditData] = useState<null | Manager>(data);

  // editData 값 수정
  const changeValue = (key: keyof Manager, value: string): void => {
    setEditData((prev): any => ({ ...prev, [key]: value }));
  };

  // 수정 데이터 전송
  const submit = (): void => {
    const form = {
      ...data,
      MNG_NM: editData?.MNG_NM,
      MNG_NUM: editData?.MNG_NUM,
    };
    http.put("/manager/" + MNG_SQ, form).then(({ data }) => {
      if (!data?.result) {
        return alert("사용자 정보 수정", "정보 수정에 실패하였습니다.");
      }
      alert("사용자 정보 수정", "정보가 수정되었습니다.");
      setIsEdit(false);
      getData();
    });
  };

  // 유효성 검사
  const validate = (): void => {
    if (!MNG_SQ) {
      return alert("사용자 정보 수정", "사용자 정보가 없습니다.");
    }
    if (!editData?.MNG_NM) {
      if (nameRef?.current) nameRef?.current?.focus();
      return;
    }
    if (
      !editData?.MNG_NUM ||
      editData?.MNG_NUM?.length < 12 ||
      editData?.MNG_NUM?.length > 13
    ) {
      if (numRef?.current) numRef?.current?.focus();
      return;
    }

    submit();
  };

  useEffect(() => setIsEdit(false), [isScreenChange]);
  useEffect(() => setEditData(data), [data, isEdit]);
  useEffect(() => {
    if (isEdit && nameRef?.current) nameRef?.current?.focus();
  }, [isEdit]);

  return (
    <Section>
      <SectionTitle>사용자 정보</SectionTitle>

      <Content>
        <Text>이름</Text>
        {isEdit ? (
          <Input
            ref={nameRef}
            placeholder="이름을 입력해주세요."
            value={editData?.MNG_NM ?? ""}
            onChangeText={(text) => changeValue("MNG_NM", text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              if (numRef?.current) numRef?.current?.focus();
            }}
          />
        ) : (
          <Text isContent={true}>{data?.MNG_NM}</Text>
        )}
      </Content>

      <Content>
        <Text>연락처</Text>
        {isEdit ? (
          <Input
            ref={numRef}
            placeholder="연락처를 입력해주세요."
            value={editData?.MNG_NUM ?? ""}
            keyboardType={"number-pad"}
            onChangeText={(text) =>
              changeValue("MNG_NUM", usePhoneNumber(text))
            }
          />
        ) : (
          <Text isContent={true}>{data?.MNG_NUM}</Text>
        )}
      </Content>

      <EditBtn onPress={() => (isEdit ? validate() : setIsEdit(true))}>
        <EditIcon name={isEdit ? "check" : "pencil"} />
        <EditBtnText>{isEdit ? "저장" : "수정"}</EditBtnText>
      </EditBtn>
    </Section>
  );
};

export default MyBox;

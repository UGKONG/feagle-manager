import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
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
  Section,
  SectionTitle,
  Input,
  Text,
} from "./index.style";
import { Props } from "./index.type";

const ShopBox = ({ data, SHOP_SQ, alert, getData }: Props): JSX.Element => {
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
      SHOP_NM: editData?.SHOP_NM,
      SHOP_NUM: editData?.SHOP_NUM,
    };
    http.put("/shop/" + SHOP_SQ, form).then(({ data }) => {
      if (!data?.result) {
        return alert("피부샵 정보 수정", "정보 수정에 실패하였습니다.");
      }
      alert("피부샵 정보 수정", "정보가 수정되었습니다.");
      setIsEdit(false);
      getData();
    });
  };

  // 유효성 검사
  const validate = (): void => {
    if (!SHOP_SQ) {
      return alert("피부샵 정보 수정", "피부샵 정보가 없습니다.");
    }
    if (!editData?.SHOP_NM) {
      if (nameRef?.current) nameRef?.current?.focus();
      return;
    }
    if (
      !editData?.SHOP_NUM ||
      editData?.SHOP_NUM?.length < 12 ||
      editData?.SHOP_NUM?.length > 13
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
      <SectionTitle>피부샵 정보</SectionTitle>

      <Content>
        <Text>이름</Text>
        {isEdit ? (
          <Input
            ref={nameRef}
            placeholder="이름을 입력해주세요."
            value={editData?.SHOP_NM ?? ""}
            onChangeText={(text) => changeValue("SHOP_NM", text)}
            returnKeyType="next"
            onSubmitEditing={() => {
              if (numRef?.current) numRef?.current?.focus();
            }}
          />
        ) : (
          <Text isContent={true}>{data?.SHOP_NM}</Text>
        )}
      </Content>

      <Content>
        <Text>연락처</Text>
        {isEdit ? (
          <Input
            ref={numRef}
            placeholder="연락처를 입력해주세요."
            value={editData?.SHOP_NUM ?? ""}
            keyboardType={"number-pad"}
            onChangeText={(text) =>
              changeValue("SHOP_NUM", usePhoneNumber(text))
            }
          />
        ) : (
          <Text isContent={true}>{data?.SHOP_NUM}</Text>
        )}
      </Content>

      <Content>
        <Text>주소</Text>
        <Text isContent={true}>
          {data?.SHOP_ADD} {data?.SHOP_ADD_DTL}
        </Text>
      </Content>

      <EditBtn onPress={() => (isEdit ? validate() : setIsEdit(true))}>
        <EditIcon name={isEdit ? "check" : "pencil"} />
        <EditBtnText>{isEdit ? "저장" : "수정"}</EditBtnText>
      </EditBtn>
    </Section>
  );
};

export default ShopBox;

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderTitle from "../../layouts/HeaderTitle";
import { GasRequest, IsYes } from "../../models";
import { Store } from "../../store/index.type";
import Icon from "react-native-vector-icons/Ionicons";
import { Alert, TouchableOpacity } from "react-native";

const GasScreen = ({ navigation, route }: any): JSX.Element => {
  const user = useSelector((x: Store) => x?.user);
  const gasRequest = useSelector((x: Store) => x?.gasRequest);
  const isScreenChange = useSelector((x: Store) => x?.isScreenChange);
  const [list, setList] = useState<GasRequest[]>([]);

  // 피부샵 SQ
  const SHOP_SQ = useMemo<null | number>(() => {
    return user?.SHOP_SQ ?? null;
  }, [user]);

  // 신청 리스트 조회
  const getList = (): void => {
    if (!SHOP_SQ) return;
    http.get("/gas/" + SHOP_SQ).then(({ data }) => {
      if (!data?.result) return setList([]);
      setList(data?.current);
    });
  };

  // 가스 신청
  const gasRequestSubmit = () => {
    if (!gasRequest) return;

    gasRequest(() => getList());
  };

  // 가스 신청 취소
  const gasRequestCancel = (GR_SQ: number): void => {
    http.delete("/gas/" + GR_SQ).then(({ data }) => {
      if (!data?.result) return Alert.alert("가스신청 취소에 실패하였습니다.");
      Alert.alert("가스신청 취소", "가스신청을 취소하였습니다.", undefined, {
        cancelable: true,
      });
      getList();
    });
  };

  // 요청건 클릭
  const requestClick = (item: GasRequest): void => {
    if (item?.IS_CHK) return;

    Alert.alert("가스신청 취소", "가스신청을 취소하시겠습니까?", [
      { text: "예", onPress: () => gasRequestCancel(item?.GR_SQ) },
      { text: "아니요" },
    ]);
  };

  useEffect(getList, [user, isScreenChange]);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => (
          <TouchableOpacity onPress={gasRequestSubmit}>
            <RequestIcon />
          </TouchableOpacity>
        ),
        headerTitle: () => <HeaderTitle title="가스 신청 내역" />,
      }),
    [navigation]
  );

  return (
    <Container.Scroll>
      <DescContainer>
        <DescTitle>상태</DescTitle>
        <Desc>
          신청 <Icon name="chevron-forward" /> 신청자가 신청한 상태
        </Desc>
        <Desc>
          확인 <Icon name="chevron-forward" /> 관리자가 확인한 상태
        </Desc>
      </DescContainer>
      {list?.map((item) => (
        <Item
          key={item?.GR_SQ}
          isCheck={item?.IS_CHK}
          onPress={() => requestClick(item)}
        >
          <Name>상태: {item?.IS_CHK ? "확인됨" : "신청중"}</Name>
          <Date>신청일: {item?.GR_CRT_DT}</Date>
          {item?.IS_CHK ? <Date>확인일: {item?.GR_MOD_DT}</Date> : null}
        </Item>
      ))}
    </Container.Scroll>
  );
};

export default GasScreen;

const DescContainer = styled.View`
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
`;
const DescTitle = styled.Text`
  color: #777;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 700;
`;
const Desc = styled.Text`
  color: #999;
  font-size: 14px;
  align-items: center;
  justify-content: center;
`;
const Item = styled.TouchableOpacity.attrs<{ isCheck: IsYes }>((x) => ({
  activeOpacity: x?.isCheck ? 1 : 0.7,
}))<{ isCheck: IsYes }>`
  width: 100%;
  padding: 10px;
  background-color: ${(x) => (x?.isCheck ? "#6c539e" : "#8b61dc")};
  margin-bottom: 6px;
  border-radius: 5px;
`;
const Text = styled.Text`
  color: #ffffff;
`;
const Name = styled(Text)`
  font-size: 16px;
  margin-bottom: 5px;
`;
const Date = styled(Text)`
  font-size: 12px;
`;
const RequestIcon = styled(Icon).attrs(() => ({
  name: "arrow-redo-outline",
  color: "#444444",
  size: 26,
}))`
  padding: 3px 0 3px 3px;
`;

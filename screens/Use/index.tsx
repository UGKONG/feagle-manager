import { useEffect, useMemo, useState } from "react";
import { Alert, SafeAreaView, Text } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import Pending from "../../layouts/Pending";
import type { History } from "../../models";

const UseScreen = ({ navigation, route }: any): JSX.Element => {
  const [isPending, setIsPending] = useState<boolean>(true);
  const [list, setList] = useState<History[]>([]);

  // DEVICE_SQ
  const DEVICE_SQ = useMemo(() => {
    if (!route?.params?.DEVICE_SQ) return null;
    return route?.params?.DEVICE_SQ;
  }, [route]);

  // 뒤로가기
  const goBack = (): void => {
    Alert.alert("장비 사용 이력", "사용 이력이 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("HomeScreen");
  };

  // 장비 사용 이력 조회
  const getList = (): void => {
    if (!DEVICE_SQ) return goBack();

    http.get("/device/" + DEVICE_SQ).then(({ data }) => {
      setIsPending(false);
      if (!data?.result) return goBack();
      setList(data?.current?.HISTORY);
    });
  };

  useEffect(getList, []);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="장비 사용 이력" />,
      }),
    [navigation]
  );

  if (isPending) return <Pending />;

  return (
    <Container.Scroll onRefresh={getList}>
      {list?.map((item) => (
        <Item key={item?.HIS_SQ}>
          <Date>{item?.HIS_DT}</Date>
          <Desc>{item?.HIS_CN}</Desc>
        </Item>
      ))}
    </Container.Scroll>
  );
};

export default UseScreen;

const Item = styled.View`
  background-color: #8b61dc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;
const Date = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 5px;
`;
const Desc = styled.Text`
  font-size: 14px;
  color: #eeeeee;
`;

import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import Title from "../../layouts/Title";

const ChartScreen = ({ navigation, route }: any): JSX.Element => {
  const [list, setList] = useState([]);

  // DEVICE_SQ
  const DEVICE_SQ = useMemo(() => {
    if (!route?.params?.DEVICE_SQ) return null;
    return route?.params?.DEVICE_SQ;
  }, [route]);

  // 뒤로가기
  const goBack = (): void => {
    Alert.alert("장비 사용 통계", "사용 통계 데이터가 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("HomeScreen");
  };

  // 장비 사용 통계 조회
  const getList = (): void => {
    if (!DEVICE_SQ) return goBack();

    http.get("/device/useChart/" + DEVICE_SQ).then(({ data }) => {
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
        headerTitle: () => <HeaderTitle title="사용 통계" />,
      }),
    [navigation]
  );

  return <Container.Scroll></Container.Scroll>;
};

export default ChartScreen;

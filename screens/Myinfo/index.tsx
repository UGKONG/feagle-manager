import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import { Manager } from "../../models";
import { Store } from "../../store/index.type";

const MyinfoScreen = ({ navigation, route }: any): JSX.Element => {
  const user = useSelector((x: Store) => x?.user);
  const [data, setData] = useState<null | Manager>(null);

  // MNG_SQ
  const MNG_SQ = useMemo<null | number>(() => {
    if (!user?.MNG_SQ) return null;
    return user?.MNG_SQ;
  }, [user]);

  const goBack = (): void => {
    Alert.alert("내정보", "내정보가 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("HomeScreen");
  };

  // 장비 상세정보 조회
  const getData = (): void => {
    if (!MNG_SQ) return;

    http.get("/manager/" + MNG_SQ).then(({ data }) => {
      if (!data?.result) return goBack();
      setData(data?.current);
    });
  };

  useEffect(getData, [MNG_SQ]);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="내정보" />,
      }),
    [navigation]
  );

  return (
    <Container.Scroll>
      <Section>
        <SectionTitle>피부샵 정보</SectionTitle>
        <Content>이름: {data?.SHOP_NM}</Content>
        <Content>연락처: {data?.SHOP_NUM}</Content>
        <Content>
          주소: {data?.SHOP_ADD} {data?.SHOP_ADD_DTL}
        </Content>
      </Section>
      <Section>
        <SectionTitle>사용자 정보</SectionTitle>
        <Content>이름: {data?.MNG_NM}</Content>
        <Content>연락처: {data?.MNG_NUM}</Content>
      </Section>
    </Container.Scroll>
  );
};

export default MyinfoScreen;

const Section = styled.View`
  padding: 10px;
  background-color: #8b61dc;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Text = styled.Text`
  color: #ffffff;
`;
const SectionTitle = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;
const Content = styled(Text)`
  margin-bottom: 4px;
`;

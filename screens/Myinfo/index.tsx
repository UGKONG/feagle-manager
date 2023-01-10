import { useEffect, useMemo, useState } from "react";
import { Alert, AlertButton } from "react-native";
import { useSelector } from "react-redux";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import { Manager } from "../../models";
import { Store } from "../../store/index.type";
import ShopBox from "./ShopBox";
import MyBox from "./MyBox";
import _Button from "../../layouts/Button";
import styled from "styled-components/native";
import PwModal from "./PwModal";

const MyinfoScreen = ({ navigation, route }: any): JSX.Element => {
  const user = useSelector((x: Store) => x?.user);
  const [data, setData] = useState<null | Manager>(null);
  const [isPwModal, setIsPwModal] = useState<boolean>(false);

  // MNG_SQ
  const MNG_SQ = useMemo<null | number>(() => {
    if (!user?.MNG_SQ) return null;
    return user?.MNG_SQ;
  }, [user]);

  // SHOP_SQ
  const SHOP_SQ = useMemo<null | number>(() => {
    if (!user?.SHOP_SQ) return null;
    return user?.SHOP_SQ;
  }, [user]);

  // 알림 띄우기
  const alert = (
    title: string,
    text: string,
    buttons?: AlertButton[]
  ): void => {
    Alert.alert(title, text, buttons, { cancelable: true });
  };

  // 뒤로가기
  const goBack = (): void => {
    Alert.alert("내정보", "내정보가 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("HomeScreen");
  };

  // 내정보 상세정보 조회
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
      {/* 피부샵 정보 */}
      <ShopBox data={data} SHOP_SQ={SHOP_SQ} alert={alert} getData={getData} />

      {/* 사용자 정보 */}
      <MyBox data={data} MNG_SQ={MNG_SQ} alert={alert} getData={getData} />

      <Button onPress={() => setIsPwModal(true)}>패스워드 변경</Button>

      <PwModal visible={isPwModal} close={() => setIsPwModal(false)} />
    </Container.Scroll>
  );
};

export default MyinfoScreen;

const Button = styled(_Button)`
  background-color: #a685ea;
  border: 1px solid #9573da;
`;

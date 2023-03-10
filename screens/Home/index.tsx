import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import Title from "../../layouts/Title";
import DeviceItem from "./DeviceItem";
import HeaderTitle from "../../layouts/HeaderTitle";
import MaterialIcon1 from "react-native-vector-icons/MaterialIcons";
import MaterialIcon2 from "react-native-vector-icons/MaterialCommunityIcons";
import type { Store } from "../../store/index.type";
import type { DeviceList } from "../../models";
import type { ServiceBtnProps } from "./index.type";
import Pending from "../../layouts/Pending";
import Badge from "../../layouts/Badge";

const HomeScreen = ({ navigation }: any): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((x: Store) => x?.user);
  const isScreenChange = useSelector((x: Store) => x?.isScreenChange);
  const [deviceList, setDeviceList] = useState<DeviceList[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);

  // 피부샵 SQ
  const SHOP_SQ = useMemo<null | number>(() => {
    if (!user) return null;
    return user?.SHOP_SQ;
  }, [user]);

  // 가스 부족 (하나라도 부족하면 true)
  const isGasRaw = useMemo<boolean>(() => {
    if (!user) false;
    let result = false;
    deviceList?.forEach((item) => {
      let gas = item?.IS_GAS_DANGER ?? 0;
      if (gas) return (result = true);
    });
    return result;
  }, [deviceList]);

  // 장비 리스트 조회
  const getDeviceList = (): void => {
    if (!SHOP_SQ) return;

    http.get("/shop/" + SHOP_SQ).then(({ data }) => {
      setIsPending(false);
      if (!data?.result) return setDeviceList([]);
      setDeviceList(data?.current?.DEVICE);
    });
  };

  // 가스 신청
  const gasRequestSubmit = (callback?: () => void): void => {
    const title = "가스신청";
    const fail = "가스 신청에 실패하였습니다.";
    const success = "해당 피부샵으로 가스가 신청되었습니다.";

    http.post("/gas", { SHOP_SQ }).then(({ data }) => {
      if (!data?.result) {
        Alert.alert(title, fail, undefined, { cancelable: true });
        return;
      }

      Alert.alert(title, success, undefined, { cancelable: true });
      if (callback) callback();
    });
  };

  // 가스 신청 묻기
  const gasRequest = (callback?: () => void): void => {
    const raw = "가스부족 장비가 존재합니다.\n";
    const full = "가스부족 장비가 없습니다.\n그래도 ";

    Alert.alert(
      "가스신청",
      (isGasRaw ? raw : full) + "해당 피부샵으로 가스를 신청하시겠습니까?",
      [
        { text: "예", onPress: () => gasRequestSubmit(callback) },
        { text: "아니요" },
      ]
    );
  };

  // 스크린 이동
  const move = (name: string): void => {
    navigation.navigate(name);
  };

  useEffect(getDeviceList, [user, isScreenChange]);
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeft navigation={navigation} />,
      headerRight: () => <HeaderRight />,
      headerTitle: () => <HeaderTitle />,
      headerTitleAlign: "center",
    });
  }, [navigation]);
  useEffect(() => {
    dispatch({ type: "gasRequest", payload: gasRequest });
  }, [gasRequest]);

  if (isPending) return <Pending />;

  return (
    <Container.Scroll onRefresh={getDeviceList}>
      <Title title="장비 정보" />
      <List>
        {!deviceList?.length ? (
          <NoneItem>
            <NoneItemText>보유중인 장비가 없습니다.</NoneItemText>
          </NoneItem>
        ) : (
          deviceList?.map((item) => (
            <DeviceItem
              key={item?.DEVICE_SQ}
              data={item}
              navigate={navigation.navigate}
            />
          ))
        )}
      </List>
      <Title title="서비스" />
      <List>
        <ServiceBtn color="#66b8da" onPress={() => gasRequest()}>
          <GasIcon />
          <ServiceBtnText>가스 신청</ServiceBtnText>
          {isGasRaw && <Badge text="신청필요" style={{ bottom: 5, left: 5 }} />}
        </ServiceBtn>
        <ServiceBtn color="#668fda" onPress={() => move("Gas")}>
          <GasReqListIcon />
          <ServiceBtnText>가스 신청 내역</ServiceBtnText>
        </ServiceBtn>
        <ServiceBtn color="#51bf97" onPress={() => move("Mode")}>
          <ModeIcon />
          <ServiceBtnText>프로그램 모드 사용방법</ServiceBtnText>
        </ServiceBtn>
        <ServiceBtn color="#c8ca74" onPress={() => move("Post")}>
          <PostIcon />
          <ServiceBtnText>자료</ServiceBtnText>
        </ServiceBtn>
        <ServiceBtn color="#D779AB" onPress={() => move("Myinfo")}>
          <MyInfoIcon />
          <ServiceBtnText>내정보</ServiceBtnText>
        </ServiceBtn>
      </List>
    </Container.Scroll>
  );
};

export default HomeScreen;

const List = styled.View`
  margin-bottom: 50px;
  flex-wrap: wrap;
  flex-direction: row;
`;
const ServiceBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<ServiceBtnProps>`
  justify-content: center;
  align-items: center;
  background-color: ${(x) => x?.color};
  flex: 1;
  border-radius: 5px;
  min-width: 45%;
  min-height: 100px;
  margin: 3px;
  position: relative;
`;
const ServiceBtnText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  line-height: 24px;
  word-break: keep-all;
  padding: 0 20px;
`;
const btnIconStyle = `
  font-size: 50px;
  color: #eeeeee70;
  position: absolute;
  right: 0;
  bottom: 0;
`;
const GasIcon = styled(MaterialIcon2).attrs(() => ({
  name: "gas-station",
}))`
  ${btnIconStyle}
`;
const GasReqListIcon = styled(MaterialIcon2).attrs(() => ({
  name: "playlist-check",
}))`
  ${btnIconStyle}
`;
const ModeIcon = styled(MaterialIcon1).attrs(() => ({
  name: "model-training",
}))`
  ${btnIconStyle}
`;
const PostIcon = styled(MaterialIcon2).attrs(() => ({
  name: "format-list-checkbox",
}))`
  ${btnIconStyle}
`;
const MyInfoIcon = styled(MaterialIcon2).attrs(() => ({
  name: "information",
}))`
  ${btnIconStyle}
`;
const NoneItem = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
`;
const NoneItemText = styled.Text`
  color: #777777;
  font-size: 16px;
`;

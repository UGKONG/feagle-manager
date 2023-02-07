import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import DeviceImgBox from "./DeviceImgBox";
import Buttons from "./Buttons";
import type { DeviceDetail } from "../../models";
import DefaultBox from "./DefaultBox";
import UseBox from "./UseBox";
import VersionBox from "./VersionBox";
import Pending from "../../layouts/Pending";

const DeviceScreen = ({ navigation, route }: any): JSX.Element => {
  const [data, setData] = useState<null | DeviceDetail>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  // DEVICE_SQ
  const DEVICE_SQ = useMemo<null | number>(() => {
    if (!route?.params?.DEVICE_SQ) return null;
    return route?.params?.DEVICE_SQ;
  }, [route]);

  // 뒤로가기
  const goBack = (): void => {
    Alert.alert("장비", "장비 정보가 없습니다.", undefined, {
      cancelable: true,
    });
    navigation.navigate("HomeScreen");
  };

  // 장비 상세정보 조회
  const getData = (): void => {
    if (!DEVICE_SQ) return goBack();

    http.get("/device/" + DEVICE_SQ).then(({ data }) => {
      setIsPending(false);
      if (!data?.result) return goBack();
      setData(data?.current);
    });
  };

  useEffect(getData, [DEVICE_SQ]);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="장비 상세정보" />,
      }),
    [navigation]
  );

  if (isPending) return <Pending />;

  return (
    <Container.Scroll onRefresh={getData}>
      {/* 상태뱃지, 모델 이미지, 장비명 */}
      <DeviceImgBox
        IS_ACTIVE={data?.IS_ACTIVE ? true : false}
        GAS_VAL={data?.GAS_VAL}
        MDL_IMG_NM={data?.MDL_IMG_NM}
        DEVICE_SN={data?.DEVICE_SN}
        IS_GAS_DANGER={data?.IS_GAS_DANGER}
      />

      {/* 모델명, 일련번호, 구매일자, 설치일자 */}
      <DefaultBox
        MDL_NM={data?.MDL_NM}
        DEVICE_SN={data?.DEVICE_SN}
        DEVICE_BUY_DT={data?.DEVICE_BUY_DT}
        DEVICE_INSTL_DT={data?.DEVICE_INSTL_DT}
      />

      {/* 총 누적 시간, 총 작동 횟수, 최근 접속 일자 */}
      <UseBox
        UDD_VAL={data?.UDD_VAL}
        ON_COUNT={data?.ON_COUNT}
        DEVICE_LAST_DT={data?.DEVICE_LAST_DT}
      />

      {/* 펌웨어 버전, 소프트웨어 버전 */}
      <VersionBox
        DEVICE_SW_VN={data?.DEVICE_SW_VN}
        DEVICE_FW_VN={data?.DEVICE_FW_VN}
      />

      {/* 사용 통계 버튼, 사용 이력 버튼 */}
      <Buttons navigate={navigation.navigate} DEVICE_SQ={DEVICE_SQ} />
    </Container.Scroll>
  );
};

export default DeviceScreen;

const Title = styled.Text``;

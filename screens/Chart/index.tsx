import { useEffect, useMemo, useState } from "react";
import { Alert, Dimensions } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import { LineChart } from "react-native-chart-kit";
import { List } from "./index.type";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import Icon2 from "react-native-vector-icons/Foundation";

const chartConfig = {
  backgroundColor: "#ffffff",
  backgroundGradientFrom: "#8b61dc",
  backgroundGradientTo: "#8b61dc",
  decimalPlaces: 1,
  strokeWidth: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
};

const ChartScreen = ({ navigation, route }: any): JSX.Element => {
  const [list, setList] = useState<List[]>([]);

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
      setList(data?.current);
    });
  };

  // 랭킹 리스트
  const rankList = useMemo<List[]>(() => {
    let copy = [...list];
    copy?.sort((a, b) => b?.VALUE - a?.VALUE);
    return copy;
  }, [list]);

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

  if (!list?.length) return <Container.View></Container.View>;

  return (
    <ColScroll>
      <Description>※ 스크롤을 사용하여 통계를 볼 수 있습니다.</Description>
      <RowScroll>
        <LineChart
          data={{
            labels: list?.map((x) => x?.COMM_NM),
            datasets: [{ data: list?.map((x) => x?.VALUE) }],
            legend: ["사용횟수"],
          }}
          width={Dimensions.get("window").width * 3}
          height={220}
          chartConfig={chartConfig}
          yAxisSuffix="회"
          bezier
          style={{ borderRadius: 5 }}
        />
      </RowScroll>

      {rankList?.map((item, i) => (
        <Section key={item?.COMM_CODE}>
          <Title>
            {!item?.VALUE ? null : i === 0 ? (
              <KingIcon1 />
            ) : i === 1 || i === 2 ? (
              <KingIcon2 />
            ) : null}{" "}
            {item?.COMM_NM}
          </Title>
          <Value>{item?.VALUE}회</Value>
        </Section>
      ))}
    </ColScroll>
  );
};

export default ChartScreen;

const ColScroll = styled(Container.Scroll)``;
const RowScroll = styled(Container.Scroll).attrs(() => ({
  horizontal: true,
}))`
  padding: 0;
  margin-bottom: 20px;
`;
const Description = styled.Text`
  font-size: 12px;
  color: #777777;
  margin-bottom: 10px;
`;
const Section = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  padding: 0 5px;
`;
const Text = styled.Text`
  font-size: 15px;
  font-weight: 700;
`;
const Title = styled(Text)`
  color: #8b61dc;
  flex: 1;
  text-align: left;
`;
const Value = styled(Text)`
  color: #666666;
  flex: 1;
  text-align: right;
`;
const iconStyle = `
  font-size: 16px;
`;
const KingIcon1 = styled(Icon1).attrs(() => ({
  name: "crown",
}))`
  ${iconStyle}
  color: #ffa600;
`;
const KingIcon2 = styled(Icon2).attrs(() => ({
  name: "crown",
}))`
  ${iconStyle}
  color: #ffad3a;
`;

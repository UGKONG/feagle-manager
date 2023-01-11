import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/native";
import Badge from "../../layouts/Badge";
import NoneImage from "../../layouts/NoneImage";
import { Os } from "../../models";
import { Store } from "../../store/index.type";
import { imgPath } from "../../strings";
import type { DeviceItemProps } from "./index.type";

const DeviceItem = ({ data, navigate }: DeviceItemProps): JSX.Element => {
  const os = useSelector((x: Store) => x?.os);
  const [isImageLoadError, setIsImageLoadError] = useState<boolean>(false);

  // 가스 잔량 (%)
  const remainGas = useMemo<number>(() => {
    if (!data?.GAS_VAL) return 0;
    return data?.GAS_VAL;
  }, [data]);

  // 가스 색상
  const gasColor = useMemo<string>(() => {
    if (remainGas <= 5) return "#d54141";
    if (remainGas <= 10) return "#d35f29";
    return "#1BC24A";
  }, [remainGas]);

  // 총 누적 사용 시간
  const useTime = useMemo<string>(() => {
    if (!data?.USE_TM_VAL) return "0시간";
    return data?.USE_TM_VAL + "시간";
  }, [data]);

  // 모델 이미지
  const img = useMemo<null | string>(() => {
    if (!data?.MDL_IMG_NM) return null;
    return imgPath + "/models/" + data?.MDL_IMG_NM;
  }, [data?.MDL_IMG_NM]);

  // 장비 아이템 클릭
  const onClick = (): void => {
    navigate("DeviceScreen", { DEVICE_SQ: data?.DEVICE_SQ });
  };

  return (
    <Container os={os} onPress={onClick}>
      <Header>
        <SmallText>모델명: {data?.MDL_NM}</SmallText>
        <SmallText>일련번호: {data?.DEVICE_SN}</SmallText>
      </Header>
      <Contents>
        <Left>
          {!isImageLoadError && img ? (
            <Image
              source={{ uri: img }}
              onError={({ nativeEvent: { error } }) => {
                setIsImageLoadError(true);
              }}
            />
          ) : (
            <NoneImage />
          )}
          {remainGas <= 10 && (
            <Badge
              type="red"
              text="가스부족"
              style={{ fontSize: 14, left: 5, bottom: 5 }}
            />
          )}
        </Left>
        <Right>
          <Large>
            <LargeText>장비 별칭: {data?.DEVICE_NM}</LargeText>
            <LargeText>총 사용 시간: {useTime}</LargeText>
          </Large>
          <SmallText>가스</SmallText>
          <Gas>
            <GasProgress>
              <GasProgressBar width={remainGas} color={gasColor} />
            </GasProgress>
            <SmallText>{remainGas}%</SmallText>
          </Gas>
          <Small>
            <SmallText style={{ marginLeft: 10 }}>
              F/W {data?.DEVICE_FW_VN}
            </SmallText>
            <SmallText style={{ marginLeft: 10 }}>
              S/W {data?.DEVICE_SW_VN}
            </SmallText>
          </Small>
        </Right>
      </Contents>
    </Container>
  );
};

export default DeviceItem;

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))<{ os: null | Os }>`
  width: 100%;
  background-color: #8b61dc;
  margin-bottom: 6px;
  border-radius: 5px;
  min-height: ${(x) => (x?.os === "ios" ? 150 : 170)}px;
  max-height: ${(x) => (x?.os === "ios" ? 150 : 170)}px;
  overflow: hidden;
`;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const Contents = styled.View`
  flex: 1;
  flex-direction: row;
`;
const Left = styled.View`
  min-width: 150px;
  max-width: 150px;
  flex: 1;
  padding: 10px 10px 0;
  justify-content: flex-end;
`;
const Right = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 0 10px 5px 0;
`;
const Image = styled.Image.attrs(() => ({
  resizeMode: "cover",
  accessible: true,
}))`
  width: 90%;
  height: 90%;
`;
const Text = styled.Text`
  color: #ffffff;
`;
const Small = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
const SmallText = styled(Text)`
  font-size: 12px;
`;
const Large = styled.View`
  margin-bottom: 10px;
`;
const LargeText = styled(Text)`
  font-size: 16px;
  margin-bottom: 2px;
`;
const Gas = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2px;
  margin-bottom: 10px;
`;
const GasProgress = styled.View`
  margin-right: 6px;
  flex: 1;
  background-color: #eee;
  border-radius: 100px;
  height: 10px;
  overflow: hidden;
`;
const GasProgressBar = styled.View<{ width: number; color: string }>`
  height: 100%;
  width: ${(x) => x?.width}%;
  background-color: ${(x) => x?.color};
  border-radius: 100px;
`;

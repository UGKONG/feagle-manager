import { useMemo, useState } from "react";
import styled from "styled-components/native";
import Badge from "../../layouts/Badge";
import NoneImage from "../../layouts/NoneImage";
import { imgPath } from "../../strings";
import { Box } from "./box.style";
import { DeviceImgBoxProps } from "./index.type";

const DeviceImgBox = ({
  IS_ACTIVE,
  GAS_VAL = 0,
  MDL_IMG_NM = undefined,
  DEVICE_SN = "DEVICE",
  IS_GAS_DANGER = 0,
}: DeviceImgBoxProps): JSX.Element => {
  const [isImageLoadError, setIsImageLoadError] = useState<boolean>(false);

  // 모델 이미지
  const img = useMemo<undefined | string>(() => {
    return MDL_IMG_NM ? imgPath + "/models/" + MDL_IMG_NM : MDL_IMG_NM;
  }, [MDL_IMG_NM, imgPath]);

  // 가스 색상
  const gasColor = useMemo<string>(() => {
    return IS_GAS_DANGER ? "#d54141" : "#10cd46";
  }, [GAS_VAL]);

  return (
    <Container>
      {IS_ACTIVE && (
        <Badge style={{ top: 10, left: 10 }} text="동작중" type="green" />
      )}
      {GAS_VAL <= 10 && (
        <Badge style={{ top: 10, right: 10 }} text="가스부족" type="red" />
      )}
      <Title>{DEVICE_SN}</Title>
      {!isImageLoadError && img ? (
        <Image
          source={{ uri: img }}
          onError={() => setIsImageLoadError(true)}
        />
      ) : (
        <NoneImage size="big" />
      )}
      <GasContainer>
        <Gas width={GAS_VAL} color={gasColor} />
      </GasContainer>
      <GasText color={gasColor}>가스 {GAS_VAL}%</GasText>
    </Container>
  );
};

export default DeviceImgBox;

const Container = styled(Box)`
  background-color: #8b61dc;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0;
`;
const Title = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  margin: 30px 0 10px;
`;
const Image = styled.Image.attrs(() => ({
  resizeMode: "cover",
}))`
  width: 90%;
  min-height: 300px;
  max-height: 400px;
`;
const GasContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: 10px;
  min-height: 14px;
  max-height: 14px;
  border-radius: 100px;
  background-color: #eee;
  overflow: hidden;
`;
const Gas = styled.View<{ width: number; color: string }>`
  width: ${(x) => x?.width}%;
  height: 100%;
  border-radius: 100px;
  background-color: ${(x) => x?.color ?? "#fff"};
`;
const GasText = styled.Text<{ color: string }>`
  position: absolute;
  bottom: 30px;
  font-size: 13px;
  right: 10px;
  font-weight: 700;
  color: ${(x) => x?.color ?? "#fff"};
  text-shadow: 0 0 0 #fff;
`;

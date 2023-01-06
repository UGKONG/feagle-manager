import { Box, BoxTitle, Row } from "./box.style";
import { DefaultBoxProps } from "./index.type";

const DefaultBox = ({
  MDL_NM = "-",
  DEVICE_SN = "-",
  DEVICE_BUY_DT = "-",
  DEVICE_INSTL_DT = "-",
}: DefaultBoxProps): JSX.Element => {
  return (
    <Box>
      <BoxTitle>기본 정보</BoxTitle>
      <Row>모델명 : {MDL_NM}</Row>
      <Row>일련번호 : {DEVICE_SN}</Row>
      <Row>구매일자 : {DEVICE_BUY_DT}</Row>
      <Row>설치일자 : {DEVICE_INSTL_DT}</Row>
    </Box>
  );
};

export default DefaultBox;

import { Box, BoxTitle, Row } from "./box.style";
import { UseBoxProps } from "./index.type";

const UseBox = ({
  UDD_VAL = 0,
  ON_COUNT = 0,
  DEVICE_LAST_DT = "-",
}: UseBoxProps): JSX.Element => {
  return (
    <Box>
      <BoxTitle>사용 정보</BoxTitle>
      <Row>총 누적 시간 : {UDD_VAL?.toFixed(1)}시간</Row>
      <Row>총 작동 횟수 : {ON_COUNT}회</Row>
      <Row>최근 접속일자 : {DEVICE_LAST_DT}</Row>
    </Box>
  );
};

export default UseBox;

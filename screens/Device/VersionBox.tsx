import { Box, BoxTitle, Row } from "./box.style";
import { VersionBoxProps } from "./index.type";

const VersionBox = ({
  DEVICE_SW_VN = "-",
  DEVICE_FW_VN = "-",
}: VersionBoxProps): JSX.Element => {
  return (
    <Box>
      <BoxTitle>사용 정보</BoxTitle>
      <Row>펌웨어 버전 : {DEVICE_FW_VN}</Row>
      <Row>소프트웨어 버전 : {DEVICE_SW_VN}</Row>
    </Box>
  );
};

export default VersionBox;

import styled from "styled-components/native";
import _Button from "../../layouts/Button";
import { ButtonProps, ButtonsProps } from "./index.type";

const Buttons = ({ navigate, DEVICE_SQ }: ButtonsProps): JSX.Element => {
  return (
    <Container>
      <Button dir="left" onPress={() => navigate("ChartScreen", { DEVICE_SQ })}>
        사용 통계
      </Button>
      <Button dir="right" onPress={() => navigate("UseScreen", { DEVICE_SQ })}>
        사용 이력
      </Button>
    </Container>
  );
};

export default Buttons;

const Container = styled.View`
  margin: 30px 0;
  flex-direction: row;
`;
const Button = styled(_Button)<ButtonProps>`
  flex: 1;
  ${(x) => (x?.dir === "left" ? "margin-right" : "margin-left")}: 5px;
`;

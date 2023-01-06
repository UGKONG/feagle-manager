import { useMemo } from "react";
import styled from "styled-components/native";

type Props = {
  type?: "red" | "green";
  text?: string;
  style?: any;
};
const Badge = ({ style, type = "red", text = "뱃지" }: Props): JSX.Element => {
  const backgroundColor = useMemo<string>(() => {
    if (type === "red") return "#d54141";
    if (type === "green") return "#1BC24A";

    return "#d54141";
  }, [type]);

  const resultStyle = useMemo(
    () => ({
      ...style,
      backgroundColor,
    }),
    [style, backgroundColor]
  );

  return (
    <Container style={resultStyle}>
      <Text>{text}</Text>
    </Container>
  );
};

export default Badge;

const Container = styled.View`
  padding: 6px 12px;
  border-radius: 100px;
  position: absolute;
`;
const Text = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
  letter-spacing: 1px;
`;

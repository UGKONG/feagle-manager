import styled from "styled-components/native";

const Button = (props: any): JSX.Element => {
  return (
    <Container {...props}>
      <Text>{props?.children ?? "Button"}</Text>
    </Container>
  );
};

export default Button;

const Container = styled.TouchableOpacity.attrs<{ readOnly: boolean }>((x) => ({
  activeOpacity: x?.readOnly ? 1 : 0.7,
}))<{ readOnly: boolean }>`
  border: 1px solid ${(x) => (x?.readOnly ? "#716191" : "#8b61dc")};
  background-color: ${(x) => (x?.readOnly ? "#7a6b99" : "#8863d2")};
  padding: 12px;
  border-radius: 4px;
`;
const Text = styled.Text`
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
`;

import styled from "styled-components/native";

type ButtonProps = { readOnly: boolean };
const Button = (props: any): JSX.Element => {
  return (
    <Container {...props}>
      <Text>{props?.children ?? "Button"}</Text>
    </Container>
  );
};

export default Button;

const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  border: 1px solid #8b61dc;
  background-color: ${(x: ButtonProps) =>
    x?.readOnly ? "#7a6b99" : "#8863d2"};
  padding: 12px;
  border-radius: 4px;
`;
const Text = styled.Text`
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
`;

import styled from "styled-components/native";

type Props = {
  title?: string;
};
const HeaderTitle = ({ title }: Props): JSX.Element => {
  if (!title) {
    return (
      <Container>
        <Image />
      </Container>
    );
  }

  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
};

export default HeaderTitle;

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  font-size: 18px;
  font-weight: 700;
`;
const Image = styled.Image.attrs(() => ({
  source: require("../assets/logo.png"),
  resizeMode: "contain",
}))`
  width: 180px;
  height: 34px;
`;

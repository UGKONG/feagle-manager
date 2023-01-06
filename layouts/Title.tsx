import styled from "styled-components/native";

type Props = { title: string };

const Title = ({ title = "Title" }: Props): JSX.Element => {
  return (
    <Container>
      <Name>{title}</Name>
      <Line />
    </Container>
  );
};

export default Title;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin-right: 8px;
  letter-spacing: 1px;
  color: #232323;
`;
const Line = styled.View`
  flex: 1;
  height: 3px;
  background-color: #f8cc32;
`;

import styled from "styled-components/native";

const Footer = (): JSX.Element => {
  return (
    <Container>
      <Copyright>Copyright</Copyright>
    </Container>
  );
};

export default Footer;

const Container = styled.View`
  flex: 1;
  background-color: #eeeeee;
  align-items: center;
`;
const Copyright = styled.Text`
  color: #777777;
`;

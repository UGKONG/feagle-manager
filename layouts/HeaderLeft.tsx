import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HeaderLeft = ({ navigation }: any): JSX.Element => {
  const click = (): void => {
    navigation?.openDrawer();
  };

  return (
    <Container onPress={click}>
      <Icon />
    </Container>
  );
};

export default HeaderLeft;

const Container = styled.TouchableOpacity``;
const Icon = styled(Ionicons).attrs(() => ({
  name: "ios-menu",
  color: "#444444",
  size: 30,
}))`
  padding: 3px 3px 3px 0;
`;

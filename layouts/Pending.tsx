import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Pending = (): JSX.Element => {
  return (
    <Container>
      <ActivityIndicator size={"large"} color={"#888"} />
    </Container>
  );
};

export default Pending;

const Container = styled.View`
  min-height: 100px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

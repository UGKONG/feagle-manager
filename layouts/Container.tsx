import styled from "styled-components/native";

const Scroll = (props: any): JSX.Element => {
  return <ScrollContainer {...props}>{props?.children}</ScrollContainer>;
};

const View = (props: any): JSX.Element => {
  return (
    <ViewContainer {...props}>
      <Contents>{props?.children}</Contents>
    </ViewContainer>
  );
};

const ScrollContainer = styled.ScrollView`
  padding: 15px;
  width: 100%;
  flex: 1;
  position: relative;
  background-color: #fff;
`;
const ViewContainer = styled.SafeAreaView`
  padding: 15px;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
`;
const Contents = styled.View`
  width: 100%;
  height: 100%;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;
export default { Scroll, View };

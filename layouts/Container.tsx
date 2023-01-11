import { useState } from "react";
import { RefreshControl } from "react-native";
import styled from "styled-components/native";

type Props = {
  onRefresh?: () => void;
  children?: any;
};

const Scroll = (props: Props): JSX.Element => {
  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const fn = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1000);
    if (props?.onRefresh) props?.onRefresh();
  };

  return (
    <ScrollContainer
      {...props}
      refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={fn} />}
    >
      {props?.children}
    </ScrollContainer>
  );
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

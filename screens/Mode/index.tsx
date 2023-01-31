import { useEffect, useState } from "react";
import styled from "styled-components/native";
import useModeList from "../../hooks/useModeList";
import _Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import Pending from "../../layouts/Pending";
import Item1 from "./Item1";
import Tab from "./Tab";

const ModeScreen = ({ navigation }: any): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isPending, setIsPending] = useState<boolean>(true);
  const list = useModeList(activeTab);

  useEffect(() => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
    }, 200);
  }, [activeTab]);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="프로그램 모드 사용방법" />,
      }),
    [navigation]
  );

  return (
    <Container>
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      {isPending ? (
        <Pending />
      ) : (
        <Scroll>
          {!list?.length ? (
            <NoneItem>
              <NoneItemText>사용방법이 없습니다.</NoneItemText>
            </NoneItem>
          ) : (
            list?.map((item) => <Item1 key={item?.id} data={item} />)
          )}
        </Scroll>
      )}
    </Container>
  );
};

export default ModeScreen;

const Container = styled(_Container.View)`
  padding: 0;
`;
const Scroll = styled(_Container.Scroll)`
  margin-top: 10px;
  padding: 0;
`;
const NoneItem = styled.View`
  flex: 1;
  align-items: center;
  padding: 100px 0;
`;
const NoneItemText = styled.Text`
  color: #777777;
  font-size: 16px;
`;

import { useEffect, useState } from "react";
import styled from "styled-components/native";
import http from "../../functions/http";
import _Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import Pending from "../../layouts/Pending";
import { Mode } from "../../models";
import Item from "./Item";
import Tab from "./Tab";

const ModeScreen = ({ navigation }: any): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [list, setList] = useState<any[]>([]);

  const changeMemo = (stringArr: Mode[]): void => {
    const data = stringArr?.map((item) => ({
      id: item?.MD_SQ,
      name: item?.MD_NM,
      imgPath: item?.MD_IMG,
      materials: JSON.parse(item?.MD_MTRL || "[]"),
      steps: JSON.parse(item?.MD_STEPS || "[]"),
    }));

    setList(data);
  };

  const getMemo = (): void => {
    setIsPending(true);

    http
      .get("/mode/" + activeTab)
      .then(({ data }) => {
        if (!data?.result) return setList([]);
        changeMemo(data?.current);
      })
      .finally(() => setIsPending(false));
  };

  useEffect(getMemo, [activeTab]);
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
              <NoneItemText>사용방법이 준비중입니다.</NoneItemText>
            </NoneItem>
          ) : (
            list?.map((item) => <Item key={item?.id} data={item} />)
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

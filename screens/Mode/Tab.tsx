import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components/native";

type Props = {
  activeTab: number;
  setActiveTab: Dispatch<SetStateAction<number>>;
};

const Tab = ({ activeTab, setActiveTab }: Props) => {
  const tabList = useRef([
    { id: 1, name: "미용기기" },
    { id: 2, name: "의료기기" },
  ]);

  // Tab Active 여부
  const isActive = (id: number): boolean => {
    return activeTab === id;
  };

  return (
    <TabContainer>
      <ActiveTab count={tabList?.current?.length} activeTab={activeTab} />
      {tabList?.current?.map((item) => (
        <TabItem key={item?.id} onPress={() => setActiveTab(item?.id)}>
          <TabItemText active={isActive(item?.id)}>{item?.name}</TabItemText>
        </TabItem>
      ))}
    </TabContainer>
  );
};

export default Tab;

const TabContainer = styled.View`
  width: 100%;
  height: 44px;
  flex-direction: row;
  background-color: #eee;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
`;
const TabItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.9,
}))`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const TabItemText = styled.Text<{ active: boolean }>`
  color: ${(x) => (x?.active ? "#fff" : "#666")};
`;
const ActiveTab = styled.View<{ count: number; activeTab: number }>`
  width: ${(x) => 100 / x?.count}%;
  height: 100%;
  background-color: #8b61dc;
  position: absolute;
  border-radius: 100px;
  top: 0;
  left: ${(x) => (100 / x?.count) * (x?.activeTab - 1)}%;
  transition: left 1s;
`;

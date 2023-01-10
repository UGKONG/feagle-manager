import styled from "styled-components/native";
import Icon from "react-native-vector-icons/FontAwesome";

export const Section = styled.View`
  padding: 10px;
  background-color: #8b61dc;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
`;
export const Text = styled.Text<{ isContent?: boolean }>`
  color: #ffffff;
  font-size: 15px;
  ${(x) => (x?.isContent ? `flex: 1;` : `width: 60px;`)}
  font-weight: 700;
`;
export const TextContent = styled.Text``;
export const SectionTitle = styled(Text)`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 20px;
`;
export const Content = styled.View`
  margin-bottom: 10px;
  align-items: center;
  flex-direction: row;
`;
export const EditBtn = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  position: absolute;
  top: 0px;
  right: 0px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;
export const EditBtnText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-left: 5px;
`;
export const EditIcon = styled(Icon)`
  font-size: 16px;
  color: #ffffff;
`;
export const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  margin-left: 5px;
  border: 1px solid #eee;
  border-radius: 3px;
  background-color: #efefef;
  padding: 0 10px;
`;

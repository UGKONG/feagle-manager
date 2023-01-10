import styled from "styled-components/native";

export const Section = styled.View`
  margin-bottom: 50px;
`;
export const SectionTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 30px;
  margin-bottom: 10px;
  color: #9297aa;
  flex: 1;
  text-align: center;
`;
export const SectionImageContainer = styled.View<{ height: number }>`
  width: 100%;
  height: ${(x) => x?.height}px;
  background-color: #25282f;
  border: 2px solid #222222;
  flex-direction: row;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  margin-bottom: 10px;
`;
export const SectionImage = styled.Image.attrs(() => ({
  resizeMode: "cover",
}))`
  width: 100px;
  height: 100px;
  margin-right: 30px;
`;
export const TextContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
export const Text = styled.Text`
  color: #666666;
`;
export const Article = styled.View`
  margin-bottom: 20px;
`;
export const SubTitle = styled.Text`
  color: #25bfa9;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
`;
export const StepContainer = styled.View``;
export const StepGroup = styled.View`
  flex-direction: row;
  margin-bottom: 6px;
`;
export const StepNum = styled(Text)`
  width: 40px;
  margin-right: 4px;
  font-size: 14px;
`;
export const StepCol = styled.View``;
export const StepItem = styled(Text)`
  font-size: 14px;
`;

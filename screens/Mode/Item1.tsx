import React, { useMemo, useState } from "react";
import { Dimensions } from "react-native";
import {
  Article,
  Section,
  SectionImage,
  SectionImageContainer,
  SectionTitle,
  StepCol,
  StepContainer,
  StepGroup,
  StepItem,
  StepNum,
  SubTitle,
  Text,
  TextContainer,
} from "./index.style";
import { Memo } from "./index.type";

type Props = {
  data: Memo;
};

const Item1 = ({ data }: Props): JSX.Element => {
  const height = useMemo<number>(() => {
    const { width } = Dimensions.get("window");
    const result = width * 0.443;
    return result;
  }, [Dimensions]);

  return (
    <Section key={data?.id}>
      <SectionImageContainer height={height}>
        <SectionImage source={{ uri: data?.imgPath }} />
        <SectionTitle>{data?.name}</SectionTitle>
      </SectionImageContainer>
      <Article>
        <SubTitle>준비물</SubTitle>
        <TextContainer>
          {data?.materials?.map((item, i) => (
            <React.Fragment key={i}>
              <Text>{item}</Text>
              {i !== data?.materials?.length - 1 && <Text>, </Text>}
            </React.Fragment>
          ))}
        </TextContainer>
      </Article>
      <Article>
        <SubTitle>단계</SubTitle>
        <StepContainer>
          {data?.steps?.map((item1, i) => (
            <StepGroup key={i}>
              <StepNum>{i + 1}단계</StepNum>
              <StepCol>
                {item1?.map((item2) => (
                  <StepItem key={item2}>{item2}</StepItem>
                ))}
              </StepCol>
            </StepGroup>
          ))}
        </StepContainer>
      </Article>
    </Section>
  );
};

export default Item1;

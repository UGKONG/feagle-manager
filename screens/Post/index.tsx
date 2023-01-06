import { useEffect, useState } from "react";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderLeft from "../../layouts/HeaderLeft";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import type { Post } from "../../models";

const PostScreen = ({ navigation }: any): JSX.Element => {
  const [postList, setPostList] = useState<Post[]>([]);

  // 자료 리스트 조회
  const getPostList = (): void => {
    http.get("/board?POST_TP=post").then(({ data }) => {
      if (!data?.result) return setPostList([]);
      setPostList(data?.current);
    });
  };

  // 스크린 이동
  const move = (name: string, params: any) => {
    navigation.navigate(name, params);
  };

  useEffect(getPostList, []);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="자료" />,
      }),
    [navigation]
  );

  return (
    <Container.Scroll>
      {postList?.map((item) => (
        <PostItem
          key={item?.POST_SQ}
          onPress={() => move("PostDetailScreen", { POST_SQ: item?.POST_SQ })}
        >
          <Name>{item?.POST_TTL}</Name>
          <Date>{item?.POST_CRT_DT}</Date>
        </PostItem>
      ))}
    </Container.Scroll>
  );
};

export default PostScreen;

const PostItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  width: 100%;
  padding: 10px;
  background-color: #8b61dc;
  margin-bottom: 6px;
  border-radius: 5px;
`;
const Text = styled.Text`
  color: #ffffff;
`;
const Name = styled(Text)`
  font-size: 16px;
  margin-bottom: 2px;
`;
const Date = styled(Text)`
  font-size: 12px;
`;

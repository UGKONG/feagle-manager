import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import type { Post } from "../../models";

const PostDetailScreen = ({ navigation, route }: any): JSX.Element => {
  const [data, setData] = useState<null | Post>(null);

  // POST_SQ
  const POST_SQ = useMemo<null | number>(() => {
    if (!route?.params?.POST_SQ) return null;
    return route?.params?.POST_SQ;
  }, [route]);

  const goBack = (): void => {
    Alert.alert("자료", "자료 정보가 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("PostScreen");
  };

  const getPostData = (): void => {
    if (!POST_SQ) return goBack();

    http.get("/board/" + POST_SQ).then(({ data }) => {
      if (!data?.result) return goBack();

      setData(data?.current);
    });
  };

  useEffect(getPostData, [POST_SQ]);
  useEffect(
    () =>
      navigation.setOptions({
        headerTitleAlign: "center",
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderTitle title="자료 상세보기" />,
      }),
    [navigation]
  );

  return (
    <Container.Scroll>
      <Title>제목: {data?.POST_TTL ?? "-"}</Title>
      <Title>카테고리: {data?.POST_TP_NM ?? "-"}</Title>
      <Title>적용모델: {data?.MDL_NM ?? "-"}</Title>
      <Title>빌드버전: {data?.BUILD_VN ?? "-"}</Title>
      <Title>빌드일: {data?.BUILD_DT ?? "-"}</Title>
      <Title>작성자: {data?.MST_NM ?? "-"}</Title>
      <Title>작성일: {data?.POST_CRT_DT ?? "-"}</Title>
      <Title>내용: {data?.POST_CN ?? "-"}</Title>
      <Title>첨부파일: {JSON.stringify(data?.FILE_LIST ?? "[]")}</Title>
    </Container.Scroll>
  );
};

export default PostDetailScreen;

const Title = styled.Text``;

import { useEffect, useMemo, useState } from "react";
import { Alert, Linking } from "react-native";
import styled from "styled-components/native";
import http from "../../functions/http";
import { useFileSize } from "../../functions/utils";
import Container from "../../layouts/Container";
import HeaderRight from "../../layouts/HeaderRight";
import HeaderTitle from "../../layouts/HeaderTitle";
import type { File, Post } from "../../models";
import { imgPath } from "../../strings";
import { useSelector } from "react-redux";
import { Store } from "../../store/index.type";

const PostDetailScreen = ({ navigation, route }: any): JSX.Element => {
  const user = useSelector((x: Store) => x?.user);
  const [data, setData] = useState<null | Post>(null);

  // POST_SQ
  const POST_SQ = useMemo<null | number>(() => {
    if (!route?.params?.POST_SQ) return null;
    return route?.params?.POST_SQ;
  }, [route]);

  // 뒤로가기
  const goBack = (): void => {
    Alert.alert("자료", "자료 정보가 없습니다.", undefined, {
      cancelable: true,
    });

    navigation.navigate("PostScreen");
  };

  // 게시글 정보 조회
  const getPostData = (): void => {
    if (!POST_SQ) return goBack();

    http.get("/board/" + POST_SQ).then(({ data }) => {
      if (!data?.result) return goBack();

      setData(data?.current);
    });
  };

  // 파일 다운로드
  const fileDownload = (FILE_SQ: number): void => {
    const requestPath = `${imgPath}/api/file/${FILE_SQ}`;
    const requestQuery = `?TP=3&SQ=${user?.MNG_SQ}&NM=${user?.MNG_NM}`;
    Linking.openURL(requestPath + requestQuery);
  };

  // 파일 조회
  const getFile = (FILE_SQ: number): void => {
    http.get("/file/" + FILE_SQ).then(({ data }) => {
      if (data?.result === false) {
        return Alert.alert("파일", "파일이 존재하지 않습니다.");
      }

      fileDownload(FILE_SQ);
    });
  };

  // 파일 클릭
  const fileClick = (item: File): void => {
    if (!item?.FILE_SQ) {
      return Alert.alert("파일", "파일이 존재하지 않습니다.");
    }

    let name = `(파일 이름: ${item?.FILE_NM ?? ""})`;
    let size = `(파일 사이즈: ${useFileSize(item?.FILE_SZ)})`;
    let ask = `파일을 다운로드 하시겠습니까?`;
    Alert.alert("파일", `${ask}\n\n${name}\n${size}`, [
      { text: "예", onPress: () => getFile(item?.FILE_SQ) },
      { text: "아니요" },
    ]);
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
      {data?.POST_TP_NM ? (
        <Row>
          <RowTitle>카테고리</RowTitle>
          <Contents>{data?.POST_TP_NM}</Contents>
        </Row>
      ) : null}
      {data?.MDL_NM ? (
        <Row>
          <RowTitle>적용모델</RowTitle>
          <Contents>{data?.MDL_NM}</Contents>
        </Row>
      ) : null}
      {data?.BUILD_VN ? (
        <Row>
          <RowTitle>빌드버전</RowTitle>
          <Contents>{data?.BUILD_VN}</Contents>
        </Row>
      ) : null}
      {data?.BUILD_DT !== "0000-00-00 00:00:00" ? (
        <Row>
          <RowTitle>빌드일</RowTitle>
          <Contents>{data?.BUILD_DT}</Contents>
        </Row>
      ) : null}
      {data?.MST_NM ? (
        <Row>
          <RowTitle>작성자</RowTitle>
          <Contents>{data?.MST_NM}</Contents>
        </Row>
      ) : null}
      {data?.POST_CRT_DT ? (
        <Row>
          <RowTitle>작성일</RowTitle>
          <Contents>{data?.POST_CRT_DT}</Contents>
        </Row>
      ) : null}
      {data?.POST_CN ? (
        <Row type="col">
          <RowTitle>내용</RowTitle>
          <Contents>{data?.POST_CN}</Contents>
        </Row>
      ) : null}
      {data?.FILE_LIST?.length ? (
        <Row type="col">
          <RowTitle>첨부파일</RowTitle>
          <Contents>
            {data?.FILE_LIST?.map((item) => (
              <FileItem key={item?.FILE_SQ} onPress={() => fileClick(item)}>
                <FileItemText>
                  - {item?.FILE_NM} ({useFileSize(item?.FILE_SZ)})
                </FileItemText>
              </FileItem>
            ))}
          </Contents>
        </Row>
      ) : null}
    </Container.Scroll>
  );
};

export default PostDetailScreen;

const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 30px;
`;
const Row = styled.View<{ type?: "row" | "col" }>`
  flex-direction: ${(x) => (x?.type === "col" ? "column" : "row")};
  margin-bottom: 10px;
  margin-top: ${(x) => (x?.type === "col" ? "20px" : "0px")};
`;
const RowTitle = styled.Text`
  width: 80px;
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Contents = styled.Text`
  flex: 1;
  font-size: 15px;
`;
const FileItem = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))`
  padding: 5px 0;
  margin-bottom: 3px;
`;
const FileItemText = styled.Text`
  text-decoration: underline;
`;

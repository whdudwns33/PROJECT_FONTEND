import {
  MainContainer,
  Main,
  TopText,
  Artist,
  Advertisement,
  MusicRankTitle,
  NewMusicList,
  MusicRank,
  News,
} from "../component/main/MainPageComponent";

const MainPage = () => {
  return (
    <>
      <MainContainer>
        <Main>
          <TopText>
            <p>평범 했던 우리 모두가 가수가 되는 순간</p>
            <p>당신의 음악을 등록하세요</p>
          </TopText>
          <Artist>가수 추천 알고리즘</Artist>
          <Advertisement>광고 영역</Advertisement>
          <MusicRankTitle>지금 이 순간 인기 있는 음악 Best 100</MusicRankTitle>
          <MusicRank>음악 순위</MusicRank>
          <NewMusicList>신곡 리스트 </NewMusicList>
          <News>뉴스</News>
        </Main>
      </MainContainer>
    </>
  );
};

export default MainPage;

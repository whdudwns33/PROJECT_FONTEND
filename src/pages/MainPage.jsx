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
  P1,
  P2,
  TopContainer,
  P3,
} from "../component/main/MainPageComponent";
import Carousel from "../component/main/CatouselSlider";
import NewList from "../component/main/NewList";
import Comercial from "../component/main/Comercial";
import HeartSong from "../component/main/HeartSong";
import Gender from "../component/main/GenderAlgorism";
import UseAuth from "../hooks/UseAuth";

const MainPage = () => {
  const useAuth = UseAuth();
  // console.log("메인 페이지 useAuth :", useAuth);

  return (
    <>
      <MainContainer>
        <TopContainer>
          <TopText>
            <P1 fontSize="7rem">평범 했던 우리 모두가 가수가 되는 순간</P1>
            <P2 fontSize="5rem" color="#61E6CA" fontWeight="600">
              당신의 음악을 등록하세요.
            </P2>
            <P2 fontSize="4rem" color="white" fontWeight="600">
              여러분의 음악이 세상에 등장하는 순간을 함께합니다.{" "}
            </P2>
            <P3 fontSize="5rem" style={{ color: "#61E6CA" }}>
              현재 활동중인 크리에이터들과
            </P3>
            <P3 fontSize="4rem" style={{ color: "white" }}>
              {" "}
              영감을 주고 받아보세요!
            </P3>
          </TopText>
        </TopContainer>

        <Main>
          <Artist>
            <Carousel></Carousel>
          </Artist>

          <Advertisement>
            <Gender useAuth={useAuth}></Gender>
          </Advertisement>
          <MusicRankTitle>지금 이 순간 인기 있는 음악 Best 10</MusicRankTitle>
          <MusicRank>
            <HeartSong></HeartSong>
          </MusicRank>
          <NewMusicList>
            <NewList></NewList>
          </NewMusicList>
          <News>
            <Comercial></Comercial>
          </News>
        </Main>
      </MainContainer>
    </>
  );
};

export default MainPage;

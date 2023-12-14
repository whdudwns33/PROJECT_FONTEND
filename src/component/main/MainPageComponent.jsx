import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  height: 400vh;
  @media (max-width: 768px) {
    min-width: 430px;
  }
`;

export const Main = styled.div`
  margin: 0 auto;
  border: 3px solid red;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: 430px;
  }
`;

export const TopText = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 16%;
`;

export const Artist = styled.div`
  border: 3px solid red;
  margin-top: 3%;
  width: 100%;
  height: 12%;
`;
// height 28%

export const Advertisement = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 16%;
`;
// 44
export const MusicRankTitle = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 3%;
`;
// 50
export const MusicRank = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 20%;
`;
// 70

export const NewMusicList = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 10%;
`;
// 80

export const News = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 15%;
`;

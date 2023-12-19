import React, { useState } from "react";
import MusicAxiosApi from "../../axios/MusicAxios";
import { storage } from "../../api/firebase";
import {
  UpdateZone,
  InputBox,
  Button,
  InputContainer,
  InputContainer02,
  InputContainer01,
  Terms,
  TermsTitle,
  Term01,
  Term02,
  SingName,
  Singer,
  Composer,
  Lyricist,
  Genre,
  Purpose,
  CategoryText,
  TitleText,
  GenreButtonBox,
  GenreButton,
  PurposeButtonBox,
  PurposeButton,
  Musicimg,
  TitleUploadButton,
  SingInfo,
  Lyrics,
  LyricsInputBox,
} from "../../style/music/MusicUpdateStyle";

const UpdateBox = () => {
  // 입력값 정보 저장
  const [inputSingName, setinputSingName] = useState(""); // 노래제목
  const [inputSinger, setinputSinger] = useState(""); // 활동명
  const [inputComposer, setinputComposer] = useState(""); // 작곡가이름
  const [inputLyricist, setinputLyricist] = useState(""); // 작사가이름
  const [selectedGenre, setSelectedGenre] = useState(""); // 장르선택
  const [selectedPurpose, setSelectedPurpose] = useState(""); // 목적선택
  const [inputSingInfo, setinputSingInfo] = useState(""); // 곡소개
  const [inputLyrics, setinputLyrics] = useState(""); // 곡소개

  //앨범이미지 등록
  const [inputimgfile, setinputimgFile] = useState(""); //앨범 이미지 입력값
  const [imgfileName, setimgFileName] = useState(""); // 앨범 이미지 이름
  const [url, setUrl] = useState(""); // 앨범 이미지 url
  const [Titleimg, setTitleimg] = useState(""); // 앨범이미지
  const [previewImage, setPreviewImage] = useState(null); //미리보기

  //약관동의체크
  const [termsAgreed, setTermsAgreed] = useState(false);

  //장르 선택 기능
  const handleGenreSelection = (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre(""); // 이미 선택된 장르를 다시 클릭하면 선택 취소
    } else {
      setSelectedGenre(genre); // 선택되지 않은 장르를 선택하면 해당 장르로 변경
    }
  };

  //목적 선택 기능
  const handlePurposeSelection = (purpose) => {
    if (selectedPurpose === purpose) {
      setSelectedPurpose(""); // 이미 선택된 목적을 다시 클릭하면 선택 취소
    } else {
      setSelectedPurpose(purpose);
    }
  };

  //이미지 업로드 함수
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setinputimgFile(selectedFile);

      // 이미지 미리 보기 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        console.log("이미지선택 완료, 이미지명: " + e.target.files[0].name);
      };

      reader.readAsDataURL(selectedFile);
      setimgFileName(selectedFile.name);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUploadClick = () => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(imgfileName);

    fileRef
      .put(inputimgfile)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          console.log("저장경로 확인:", url);
          setUrl(url);
        });
      })
      .catch((error) => {
        console.error("파일 업로드 실패:", error);
      });
  };

  // 음악 등록 버튼 활성화 여부
  const isMusicUploadEnabled =
    inputSingName &&
    inputSinger &&
    inputComposer &&
    inputLyricist &&
    selectedGenre &&
    selectedPurpose &&
    inputSingInfo &&
    inputLyrics &&
    termsAgreed;

  // 음악 등록 버튼 클릭시 실행되는 함수
  const onClickSetMusic = async () => {
    if (isMusicUploadEnabled) {
      const MusicUploadData = await MusicAxiosApi.addMusic({
        SingName: inputSingName, //노래제목
        Singer: inputSinger, //활동명
        Composer: inputComposer, //작곡가
        Lyricist: inputLyricist, //작사가
        Genre: selectedGenre, //장르
        Purpose: selectedPurpose, //목적
        SingInfo: inputSingInfo, //곡소개
        Lyrics: inputLyrics, //가사
        Titleimg: url,
      });
      console.log(MusicUploadData);
    } else {
      alert("빠진 입력 사항이 없는지 확인해주세요.");
      console.error("음악 등록이 불가능합니다. 필수 입력값을 확인해주세요.");
    }
  };

  return (
    <>
      <UpdateZone>
        <h1>음원 등록하기</h1>
        <InputContainer>
          <InputContainer01>
            <SingName>
              <CategoryText>노래명</CategoryText>
              <InputBox
                placeholder="등록할 노래 제목 입력"
                value={inputSingName}
                onChange={(e) => setinputSingName(e.target.value)}
              />
              {inputSingName.length > 0 && inputSingName.length < 8}
            </SingName>

            <Singer>
              <CategoryText>가수</CategoryText>
              <InputBox
                placeholder="가수 활동명 입력"
                value={inputSinger}
                onChange={(e) => setinputSinger(e.target.value)}
              />
              {inputSinger.length > 0 && inputSinger.length < 8}
            </Singer>

            <Composer>
              <CategoryText>작곡가</CategoryText>
              <InputBox
                placeholder="작곡가 이름 입력"
                value={inputComposer}
                onChange={(e) => setinputComposer(e.target.value)}
              />
              {inputComposer.length > 0 && inputComposer.length < 8}
            </Composer>

            <Lyricist>
              <CategoryText>작사가</CategoryText>
              <InputBox
                placeholder="작사가 이름 입력"
                value={inputLyricist}
                onChange={(e) => setinputLyricist(e.target.value)}
              />
              {inputLyricist.length > 0}
            </Lyricist>

            <Genre>
              <CategoryText>장르</CategoryText>
              <GenreButtonBox>
                <GenreButton
                  onClick={() => handleGenreSelection("발라드")}
                  active={selectedGenre === "발라드" ? "selected" : ""}
                >
                  발라드
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("락/메탈")}
                  active={selectedGenre === "락/메탈" ? "selected" : ""}
                >
                  락/메탈
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("포크/블루스")}
                  active={selectedGenre === "포크/블루스" ? "selected" : ""}
                >
                  포크/블루스
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("R&B/SOUL")}
                  active={selectedGenre === "R&B/SOUL" ? "selected" : ""}
                >
                  R&B/SOUL
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("힙합/랩")}
                  active={selectedGenre === "힙합/랩" ? "selected" : ""}
                >
                  힙합/랩
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("어쿠스틱")}
                  active={selectedGenre === "어쿠스틱" ? "selected" : ""}
                >
                  어쿠스틱
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("트로트")}
                  active={selectedGenre === "트로트" ? "selected" : ""}
                >
                  트로트
                </GenreButton>
                <GenreButton
                  onClick={() => handleGenreSelection("기타")}
                  active={selectedGenre === "기타" ? "selected" : ""}
                >
                  기타
                </GenreButton>
              </GenreButtonBox>
            </Genre>

            <Purpose>
              <CategoryText>목적</CategoryText>
              <PurposeButtonBox>
                <PurposeButton
                  onClick={() => handlePurposeSelection("영리")}
                  active={selectedPurpose === "영리" ? "selected" : ""}
                >
                  영리
                </PurposeButton>
                <PurposeButton
                  onClick={() => handlePurposeSelection("비영리")}
                  active={selectedPurpose === "비영리" ? "selected" : ""}
                >
                  비영리
                </PurposeButton>
              </PurposeButtonBox>
            </Purpose>
          </InputContainer01>

          <InputContainer02>
            <Musicimg>
              <TitleText>타이틀 이미지</TitleText>
              <InputBox placeholder="이미지명" value={imgfileName} />
              <TitleUploadButton onChange={handleFileInputChange}>
                업로드
              </TitleUploadButton>
            </Musicimg>

            <SingInfo>
              <CategoryText>곡소개</CategoryText>
              <InputBox
                placeholder="곡에 대한 간략한 설명"
                value={inputSingInfo}
                onChange={(e) => setinputSingInfo(e.target.value)}
              />
              {inputSingInfo.length > 0 && inputSingInfo.length < 30}
            </SingInfo>

            <Lyrics>
              <CategoryText>가사</CategoryText>
              <LyricsInputBox
                placeholder="가사를 등록해주세요"
                value={inputLyrics}
                onChange={(e) => setinputLyrics(e.target.value)}
              />
              {inputLyrics.length > 0 && inputLyrics.length < 2000}
            </Lyrics>
          </InputContainer02>

          <Terms>
            <TermsTitle>약관동의</TermsTitle>
            <Term01>
              서비스 이용 및 저작권 관련 약관
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </Term01>

            <Term02>
              판매수익 지급 및 분배 동의
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
            </Term02>
          </Terms>

          {/* 이미지 미리 보기 */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </InputContainer>

        {/* 등록 버튼 */}
        <div className="buttonContainer">
          <Button enabled={isMusicUploadEnabled} onClick={onClickSetMusic}>
            등록하기
          </Button>
        </div>
      </UpdateZone>
    </>
  );
};

export default UpdateBox;

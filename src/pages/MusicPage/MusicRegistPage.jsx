import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  UserInfo,
  UpdateZone,
  InputBox,
  Button,
} from "../../style/music/MusicUpdateStyle";
import UpdateBox from "../../component/MusicList/UpdateBox";
import UpdateUserInfo from "../../component/MusicList/UpdateUserInfo";

const MusicRegistPage = () => {
  // const navigate = useNavigate();

  // const email = window.localStorage.getItem("email");
  // console.log(email);

  // useEffect(() => {
  //   if (!email) {
  //     alert("로그인이 필요합니다.");
  //     navigate("/login");
  //   }
  // }, []);

  // 입력값을 서버로 전송할 부분

  return (
    <>
      <Container>
        <UpdateUserInfo />
        <UpdateBox />
      </Container>
    </>
  );
};

export default MusicRegistPage;

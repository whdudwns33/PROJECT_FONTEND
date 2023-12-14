import React from "react";
import styled from "styled-components";
import headlogo from "../images/Symbol_white.png";

const NavContainer = styled.div`
  height: 8rem;
  width: 100vw;
  display: flex;
  position: relative;
  left: 0px;
  top: 0px;
  background: #000000;
`;

const Code8Head = styled.div`
  height: 8rem;
  width: 100%;
  display: flex;
  position: relative;
  border: 1px solid white;
  padding-left: 8rem;

  align-items: center;
  flex-direction: row;
`;

const TextBox01 = styled.div`
  font-size: 2rem;
  // display: flex;
  position: relative;
  font-weight: bold;
  color: white;
  padding-right: 13rem;
  text-align: center;
`;

const Textbox02 = styled.div`
  font-size: 2rem;
  display: flex;
  position: relative;
  font-weight: bold;
  color: white;
  padding-right: 13rem;
  text-align: center;
`;

const Textbox03 = styled.div`
  font-size: 2rem;
  display: flex;
  position: relative;
  font-weight: bold;
  color: white;
  padding-right: 30rem;
  text-align: center;
  width: 10rem;
`;

const HeadLogo = styled.img`
  width: 12rem;
  height: 5rem;
  display: flex;
  position: relative;
  padding-right: 30rem;
`;

const Textbox04 = styled.div`
  font-size: 2rem;
  display: flex;
  position: relative;
  font-weight: bold;
  color: white;
  padding-right: 8rem;
  text-align: center;
  width: 8rem;
`;

const Textbox05 = styled.div`
  font-size: 2rem;
  display: flex;
  position: relative;
  font-weight: bold;
  color: white;
  text-align: center;
  width: 100px;
  margin-right: 8rem;
`;

const Header = () => {
  return (
    <NavContainer>
      <Code8Head>
        <TextBox01>공연</TextBox01>
        <Textbox02>STORE</Textbox02>
        <Textbox03>공지사항</Textbox03>
        <HeadLogo alt="헤더바로고" src={headlogo}></HeadLogo>
        <Textbox04>로그인</Textbox04>
        <Textbox05>회원가입</Textbox05>
      </Code8Head>
    </NavContainer>
  );
};

export default Header;

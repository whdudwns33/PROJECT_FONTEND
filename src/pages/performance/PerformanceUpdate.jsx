import AxiosApi from "../../axios/PerformanceAxios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
`;

const UserInfo = styled.div`
  width: 80%;
  height: 21.5rem;
  margin-top: 5rem;
  border-radius: 1rem;
  background: linear-gradient(to right, var(--maingreen), var(--mainblue));
  `;

const UpdateBox = styled.div`
  margin: 3rem 0rem;
  border-radius: 1rem;
  width: 80%;
  box-shadow: 0 1rem 3rem -0.5rem rgba(0, 0, 0, 0.25);
  height: 36rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  div.inputContainer {
    width: 95%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    /* background-color: skyblue; */
    flex-wrap: wrap;
    div{
      margin-left: 3.5rem;
      width: 30%;
    /* background-color: pink; */
    font-weight: 200;
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
    }
    div.discription {
      Input {
        height: 17rem;
      }
    }

  }

  h1{
    padding-left: 3.5rem;
    font-size: 4rem;
    width: 100%;
    height: 5rem;
    /* background-color: blue; */
    color: var(--mainolive);
  }

  div.buttonContainer {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: right;
    /* background-color: skyblue; */
  
  }

`;

const InputBox = styled.input`
  margin-bottom: 1rem;
  width: 75%;
  height: 3.5rem;
  border: 0.03rem solid var(--mainolive);
  
  &::placeholder {
    color: var(--mainolive);
    padding-left: 1rem;
  
  }

`;

const Button = styled.button`
  width: 10rem;
  height: 4.5rem;
  border-radius: 4rem;
  font-size: 1.8rem;
  font-weight: 700; 
  color: var(--maindarkgreen);
  border: 0.3rem solid var(--maindarkgreen);
  margin-right: 5rem;
`;


const PerformanceUpdate = () => {

  // 입력값 정보 저장
  const [ performer, setPerformer ] = useState([]); // 참여자
  const [ venue, setVenue ] = useState(""); // 공연장소
  const [ detailVenue, setDetailVenue ] = useState(""); // 상세공연장소
  const [ date, setDate ] = useState(""); // 공연일시
  const [ title, setTitle ] = useState(""); // 공연제목
  const [ poster, setPoster ] = useState(""); // 포스터
  const [ seat, setSeat ] = useState(""); // 좌석수
  const [ description, setDescription ] = useState(""); // 공연소개

  // 유효성 검사, 포스터이미지, 설명은 없어도 되는 값이므로 제외
  const [ isperformer, setIsPerformer ] = useState(false); // 참여자 입력유무
  const [ isvenue, setIsVenue ] = useState(false); // 공연장소 입력유무
  const [ isdetailVenue, setIsDetailVenue ] = useState(false); // 상세공연장소 입력유무
  const [ isdate, setIsDate ] = useState(false); // 공연일시 입력유무
  const [ istitle, setIsTitle ] = useState(false); // 공연제목 입력유무
  const [ isseat, setIsSeat ] = useState(false); // 좌석수 입력유무

  const navigate = useNavigate();

  const email = (window.localStorage.getItem("email"));
  console.log(email);

  useEffect(() => {
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []); 

  // 입력값을 서버로 전송할 부분


  return (
    <>
    <Container>
      <UserInfo>
        <div className="image"></div>
        <div className="rightInfo"></div>
        <div className="leftInfo"></div>
        <div className="point"></div>
      </UserInfo>
      <UpdateBox>
        <h1>공연 등록하기</h1>
        <div className="inputContainer">
          <div className="performer">
            참여자
            <InputBox />
          </div>
          <div className="venue">
            공연 주소
            <InputBox placeholder="주소 입력"/>
          </div>
          <div className="detailVenue">
            상세 주소
            <InputBox />
          </div>
          <div className="date">
            일시
            <InputBox />
          </div>
          <div className="title">
            제목
            <InputBox />
          </div>
          <div className="poster">
            포스터
            <InputBox />
          </div>
          <div className="seat">
            좌석 수
            <InputBox />
          </div>
          <div className="discrip">
            소개
            <InputBox />
          </div>
          <div className="discription">
            소개
            <InputBox />
          </div>
        </div>
        <div className="buttonContainer">
        <Button>등록하기</Button>
        </div>
        
      </UpdateBox>
    

    </Container>
      
    </>
  );

};

export default PerformanceUpdate;
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Img from "../../images/Artist.png";
import Img2 from "../../images/Artist_2.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  /* border: 3px solid black; */
  height: 80%;
  width: 100%;
  margin-top: 3%;
`;

const Content = styled.div`
  /* border: 3px solid green; */
  border-radius: 20px;
  margin: 0 auto;
  width: 100%;
  height: 50vh;
  background-image: ${(props) => `url(${props.imagePath})`};
  /* background-color: green; */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  color: gray;
`;

const Comercial = () => {
  const list = [Img, Img2, Img, Img2, Img, Img2];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <h1>공연 광고 영역</h1>
      <Slider {...settings}>
        {list.map((data, index) => (
          <Content key={index} imagePath={data}></Content>
        ))}
      </Slider>
    </>
  );
};

export default Comercial;

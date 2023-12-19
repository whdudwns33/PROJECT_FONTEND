import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Img from "../../images/Artist.png";
import Img2 from "../../images/Artist_2.png";
import styled from "styled-components";
import MainAxios from "../../axios/MainAxios";

const Container = styled.div`
  border: 3px solid red;
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  /* border: 3px solid gray; */
  width: 100%;
  height: 45vh;
`;

const Content = styled.div`
  width: 100%;
  height: 30vh;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
`;

const NewList = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.notLoginNewList();
      console.log("새로운 리스트 정보 : ", res);
      setList(res.data);
    };
    getList();
  }, []);
  //
  SwiperCore.use([Pagination, Navigation, Autoplay]);

  return (
    <Container>
      <h1>새로운 음악 리스트</h1>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2000 }}
        // loop={true}
      >
        {list.map((data, index) => (
          <SwiperSlide key={index}>
            <Content imagePath={data.musicDTO.thumbnailImage}>
              <p>Titile : {data.musicDTO.musicTitle}</p>
            </Content>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};
export default NewList;

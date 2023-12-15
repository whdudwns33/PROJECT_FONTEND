import moment from "moment";
import "moment/locale/ko";
import axios from "axios";
moment.locale("ko");

export const CHORD8_DOMAIN = "http://localhost:8111";

const Common = {
  KH_DOMAIN: "http://localhost:8111",
  SOCKET_URL: "ws://localhost:8111/ws/comment",
  API_KEY: "a42a4db55c114cff5770a883fc8607f9",
  REDIRECT_URL: "http://localhost:3000/kakao",
  SECRET_KEY: "Xs7FwH1FUNOkspaOszcuw2wZXTQGrEIs",

  timeFromNow: (timestamp) => {
    return moment(timestamp).fromNow();
  },
  formatDate: (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading 0 if needed
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    return `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`;
  },

  // 401 에러 처리 함수
  handleUnauthorized: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const res = await axios.post(
        `${CHORD8_DOMAIN}/auth/refresh`,
        refreshToken,
        config
      );
      console.log(res.data);
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
};

export default Common;

import axios from "axios";
import {Common, Interceptor} from "../utils/Common"


const BACK_DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 회원 정보 조회
  getUserList: async () => {
    return await axios.get(BACK_DOMAIN + "/auth/userList");
  },

  // 상품 조회
  productGet: async () => {
    return await axios.get(BACK_DOMAIN + "/product/productlist");
  },

  // ID를 기준으로 상품을 찾음
  findProductById: async (id) => {
    const response = await axios.get(BACK_DOMAIN + `/product/${id}`);
    return response;
  },

  // 뉴스 조회
  newsGet: async () => {
    return await axios.get(BACK_DOMAIN + "/news/newslist");
  },

    // 물건 결제하기
    doPurchase: async (price) => {
      const accessToken = Common.getAccessToken();
      const productDto = {
        token: accessToken,
        productPrice : price
      }
      return await Interceptor.post(BACK_DOMAIN + "/product/purchase", productDto, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      } )
    }
};
export default AxiosApi;

export const getProduct = async () => {
  try {
    // console.log(searchQuery);s
    const response = await fetch(`${BACK_DOMAIN}/"/product/productlist"`)
    
    if (!response.ok) {
      throw new Error('Network fail');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetching data failed:', error);
    throw error;
  };
};

export const getSearchedArtists = async (searchQuery) => {
  try {
    // console.log(searchQuery);s
    const response = await fetch(
      `${BACK_DOMAIN}/product/search?keyword=${searchQuery}`
    );

    if (!response.ok) {
      throw new Error("Network fail");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetching data failed:", error);
    throw error;
  }
};

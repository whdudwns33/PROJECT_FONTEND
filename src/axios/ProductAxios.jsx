import axios from "axios";

const BACK_DOMAIN = "http://localhost:8111";

const AxiosApi = {

    // 상품 조회
    productGet: async () => {
        return await axios.get(BACK_DOMAIN + "/product/productlist")
    },

    // ID를 기준으로 상품을 찾음
    findProductById: async (id) => {
        const response = await axios.get(BACK_DOMAIN + `/product/${id}`);
        return response;
    },
    
    // 뉴스 조회
    newsGet: async () => {
        return await axios.get(BACK_DOMAIN + "/news/newslist")
    },
};
export default AxiosApi;

export const getSearchedArtists = async (searchQuery) => {
    try {
      // console.log(searchQuery);s
      const response = await fetch(`${BACK_DOMAIN}/product/search?keyword=${searchQuery}`)
      
      if (!response.ok) {
        throw new Error('Network fail');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    };
};


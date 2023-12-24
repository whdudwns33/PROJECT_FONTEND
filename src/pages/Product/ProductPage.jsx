import React, { useState, useEffect } from "react";
import AxiosApi from "../../axios/ProductAxios";
import { Container } from "../../style/Product/Product-Layout";
import ArtistList from "../../component/Product/ArtistList";
import ProductListPage from "../../component/Product/ProductListPage";

// 상품 리스트 페이지
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await AxiosApi.productGet();
          setProducts(response.data);
          } catch (error) {
          console.error('데이터를 불러오는데 실패했습니다', error);
        }
      };
      fetchData();
  }, []);

  return (
    <>
      <Container>
        <ArtistList onArtistSelect={setSelectedArtist}/>
        <ProductListPage products={products} setProducts={setProducts}/>
      </Container>
    </>
  );
}

export default ProductPage;

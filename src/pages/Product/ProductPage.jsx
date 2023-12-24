import React, { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { Container } from "../../style/Product/Product-Layout";
import ProductItemText from "../../component/product/ProductList";
import ArtistList from "../../component/product/ArtistList";

// 상품 리스트 페이지
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await AxiosApi.get();
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
        <ArtistList onArtistSelect={setSelectedArtist} />
        <ProductItemText selectedArtist={selectedArtist} />
      </Container>
    </>
  );
}

export default ProductPage;

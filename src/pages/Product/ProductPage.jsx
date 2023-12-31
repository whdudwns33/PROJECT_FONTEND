import React, { useState } from "react";
import { Container } from "../../style/Product/Product-Layout";
import ProductListPage from "../../component/Product/ProductListPage";
import ArtistListPage from "../../component/Product/ArtistListPage";

// 상품 리스트 페이지
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleArtistSelect = (selectedArtist) => {
    // 선택된 아티스트에 따라 상품 목록 필터링
    if (selectedArtist) {
      const filtered = products.filter(product => product.artistName === selectedArtist);
      setFilteredProducts(filtered);
    } else {
      // 아티스트가 선택되지 않았을 경우, 전체 상품 목록 표시
      setFilteredProducts(products);
    }
  };
  
  return (
    <>
      <Container>
        <ArtistListPage onArtistSelect={handleArtistSelect} />
        <ProductListPage products={products} setProducts={setProducts}/>
      </Container>
    </>
  );
}

export default ProductPage;

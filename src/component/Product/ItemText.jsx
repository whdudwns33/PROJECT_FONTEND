import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import { ProductContainer, ItemText } from "../../style/Product/Product-Layout";


const ProductItemText = ({ selectedArtist }) => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        // 상품 데이터를 가져오는 함수
        const fetchProducts = async () => {
            try {
                const response = await AxiosApi.productGet();
                setProducts(response.data);
            } catch (error) {
                console.error('데이터를 불러오는데 실패했습니다', error);
            }
        };

        fetchProducts();
    }, []);

    // 선택된 아티스트가 있는 경우 해당 아티스트의 상품만 필터링
    // 필터링된 상품 데이터
    const filteredProducts = selectedArtist
        ? products.filter(product => product.artistName === selectedArtist)
        : products;
    
    return (
        <>
            <ProductContainer>
                <ItemText>상품 ( {filteredProducts.length} )</ItemText>
            </ProductContainer>
        </>
    );
};

export default ProductItemText;


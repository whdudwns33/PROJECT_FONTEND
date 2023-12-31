import AxiosApi from "../../axios/ProductAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import ProductSearchPage from '../../component/Product/ProductSearchPage';
import { getSearchedArtists } from "../../axios/ProductAxios";
import { 
    ProuctPrice,
    ProuctName,
    ProductContainer, 
    GridContainer, 
    GridItem } from "../../style/Product/Product-Layout";
import { 
    BtnShape,
    ClickBtn,
    TotalAmount,
    Totality,
    Quantity,
    QuantityText,
    FreeShipping,
    ItemContainer, 
    ImgContainer, 
    CalContainer,
    ProductName,
    ProductPrice,
    SearchContainer,
    CalProduct,
    ArtistSearch
} from "../../style/Product/Product-Detail";
import ProductItemCnt from "./ProductItemCnt";


const ProductListPage = ({ selectedArtist,products,setProducts}) => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 제품 상태
    const [count, setCount] = useState(1); // 상품 수량 관리
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products); // 검색된 제품들을 저장할 상태
    const { addToCart } = useCart();
    
    const totalPrice = selectedProduct && selectedProduct.productPrice
    ? parseInt(selectedProduct.productPrice.replace(/,/g, '')) * count 
    : 0;
    const formattedTotalPrice = totalPrice.toLocaleString();
    
    // 상품 수량 변경 핸들러
    const handleQuantityChange = (newQuantity) => {
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setCount(newQuantity);
        } else {    
            setCount(1); // 기본값 설정 또는 다른 오류 처리
        }
    };
    
    // 구매 처리 함수
    const handlePurchase = () => {
        console.log({
            productName: selectedProduct.productName, 
            quantity: count, 
            totalPrice: formattedTotalPrice 
        });

        const productDetails = {
            ...selectedProduct,
            quantity: count,
            totalPrice: totalPrice
        };

        navigate('/orderform', { state: productDetails })
    };
        
    
    useEffect(() => {
        productList();
    }, [selectedArtist]);

    useEffect(() => {
        productList();
    }, []);

    useEffect(() => {
        if(!searchQuery) {
            setFilteredProducts(products);
        }
    }, [products]);    

    // 검색 로직
    useEffect(() => {
        const fetchSearchedArtists = async () => {
            if (searchQuery) {
                const searchedArtists = await getSearchedArtists(searchQuery);
                console.log(searchedArtists);
                setFilteredProducts(searchedArtists); // 검색된 제품들을 상태에 저장
            } else {
                setFilteredProducts(products); // 검색어가 없을 때는 모든 제품을 표시
            }
        };
        fetchSearchedArtists();
    }, [searchQuery, products]);

    const handleAddToCart = () => {
        console.log("Adding to cart:", selectedProduct); // 
        addToCart(selectedProduct, count, totalPrice);
        navigate('/cart');
    };

    const productList = async () => {
        try {
            const response = await AxiosApi.productGet();
            let data = response.data;
            if (selectedArtist) {
                data = data.filter(product => product.artistName === selectedArtist);
            }
            setProducts(data);
            setFilteredProducts(data); 
        } catch (error) {
            console.error('데이터를 불러오는데 실패했습니다', error);
        }
    };
    
    const handleProductClick = productId => {
        console.log("Clicked Product ID:", productId);
        const product = filteredProducts.find(p => p.productId === productId);
        console.log("Found Product:", product);
        setSelectedProduct(product);
    };

    return (
        <>
            {selectedProduct ? (
                <ItemContainer>
                    <SearchContainer>
                            <ProductSearchPage setSearchQuery={setSearchQuery} />
                    </SearchContainer>
                    <ArtistSearch>
                            <ImgContainer>
                                <img alt="productimg" 
                                src={selectedProduct.productImage} 
                                style={{width:"30vw", height:"30vw"}}
                                />
                            </ImgContainer>
                            <CalContainer>
                                <CalProduct>
                                    <ProductName>{selectedProduct.productName}</ProductName>
                                    <ProductPrice>{selectedProduct.productPrice}원</ProductPrice>
                                    <FreeShipping>무료배송</FreeShipping>
                                    <Quantity>
                                        <QuantityText>수량</QuantityText>
                                        <ProductItemCnt count={count} onCountChange={handleQuantityChange} />
                                    </Quantity>
                                    <Totality>
                                        <div>{count}개 상품 금액 </div>
                                        <TotalAmount>{formattedTotalPrice} 원</TotalAmount>
                                    </Totality>
                                    <BtnShape>
                                        <ClickBtn onClick={handleAddToCart}>장바구니 담기</ClickBtn>
                                    </BtnShape>
                                </CalProduct>
                            </CalContainer>
                    </ArtistSearch>
                </ItemContainer>
            ) : (
                <>
                    <SearchContainer>
                    <ProductSearchPage setSearchQuery={setSearchQuery} />
                        <ProductContainer>
                        <GridContainer>
                            {filteredProducts.map(product => (
                            <GridItem key={product.productId} onClick={() => handleProductClick(product.productId)}>
                                <img alt="이미지" 
                                src={product.productImage}
                                style={{width:"20vw", height:"20vw"}}
                                />
                                <ProuctName>{product.productName}</ProuctName>
                                <ProuctPrice>{product.productPrice}원</ProuctPrice>
                            </GridItem>
                            ))}
                        </GridContainer>
                        </ProductContainer>
                    </SearchContainer>
                </>
            )}
        </>
    );
};

export default ProductListPage;
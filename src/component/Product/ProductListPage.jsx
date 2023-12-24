import AxiosApi from "../../axios/ProductAxios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';
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
    ProductPrice 
} from "../../style/Product/Product-Detail";
import ProductItemText from "./ProductItemText";
import ProductItemCnt from "./ProductItemCnt";


const ProductListPage = ({ selectedArtist,products,setProducts}) => {
    const navigate = useNavigate();
    // const [products, setProducts] = useState([]); // 제품 목록 상태
    const [selectedProduct, setSelectedProduct] = useState(null); // 선택된 제품 상태
    const [count, setCount] = useState(1); // 상품 수량 관리
    // const [cart, setCart] = useState([]); // 장바구니 상태
    const { addToCart } = useCart();

    // 상품 수량 변경 핸들러
    const handleQuantityChange = (newQuantity) => {
        if (!isNaN(newQuantity) && newQuantity > 0) {
            setCount(newQuantity);
        } else {    
            // 유효하지 않은 값 처리
            setCount(1); // 기본값 설정 또는 다른 오류 처리
        }
    };
    
    // 선택된 제품의 총 가격 계산
    const totalPrice = selectedProduct? parseInt(selectedProduct.productPrice.replace(/,/g, '')) * count : 0;

    // 총 가격을 천 단위 구분자 형식으로 표시
    const formattedTotalPrice = totalPrice.toLocaleString();

    // 목록으로 돌아가기
    const handleBackToList = () => {
        setSelectedProduct(null); // 선택된 제품 초기화
        setCount(1); // count를 초기값(예: 1)으로 재설정
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
    
    // cart 상태가 변경될 때마다 실행
    // useEffect(() => {
    //     if (cart.length > 0) {
    //         navigateToCart();
    //     }
    // }, [cart]);

    // selectedArtist가 변경될 때마다 productList 함수를 호출
    useEffect(() => {
        productList();
    }, [selectedArtist]);


    // 장바구니 페이지로 이동ProductItemText
    // const navigateToCart = () => {
    //     navigate('/cart', { state: { cartItems: cart } }); // cart 상태를 cartItems로 전달
    // };
    const handleAddToCart = () => {
        console.log("Adding to cart:", selectedProduct); // 
        // 장바구니에 상품 추가
        addToCart(selectedProduct, count, totalPrice);
        // 장바구니 페이지로 이동
        navigate('/cart');
    };

    // 구매 리뷰 이벤트 핸들러
    const handleReview = () => {
        navigate('/reviews', { state: { productId: selectedProduct.productId } });
    };

    const productList = async () => {
        try {
            const response = await AxiosApi.productGet();
            let data = response.data;
            if (selectedArtist) {
                data = data.filter(product => product.artistName === selectedArtist);
            }
            setProducts(data);
        } catch (error) {
            console.error('데이터를 불러오는데 실패했습니다', error);
        }
    };
    
    useEffect(() => {
        productList();
    }, []);

    const handleProductClick = productId => {
        console.log("Clicked product ID:", productId);
        const product = products.find(p => p.productId === productId);
        console.log("Selected product:", product);
        setSelectedProduct(product);
    };
    

    return (
        <>
            {selectedProduct ? (
                // 선택된 제품이 있을 때, 제품 세부 정보만 표시
                <ItemContainer>
                    <ImgContainer>
                        <img alt="productimg" src={selectedProduct.productImage} style={{width:"38rem", height:"38rem"}}/>
                    </ImgContainer>
                    <CalContainer>
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
                            <ClickBtn onClick={handleAddToCart}>장바구니</ClickBtn>
                            <ClickBtn onClick={handlePurchase}>바로 구매하기</ClickBtn>
                            <ClickBtn onClick={handleReview}>구매후기</ClickBtn>
                            <ClickBtn>구매문의</ClickBtn>
                        </BtnShape>
                        <div>
                            <button onClick={handleBackToList}>목록으로 돌아가기</button>
                        </div>
                    </CalContainer>
                </ItemContainer>
            ) : (
                // React Component는 렌더링할 때 단일 루트 요소만 반환이 가능하기 때문에,
                // 여러 요소를 반환할 때 이들을 하나의 부모 요소로 감싸야 함.
                <>
                    <ProductContainer>
                        <ProductItemText products={products} />
                        <GridContainer>
                            {products.map(product => (
                                <GridItem key={product.productId} onClick={() => handleProductClick(product.productId)}>
                                    <img alt="이미지" src={product.productImage} />
                                    <ProuctName>{product.productName}</ProuctName>
                                    <ProuctPrice>{product.productPrice}원</ProuctPrice>
                                </GridItem>
                            ))}
                        </GridContainer>
                    </ProductContainer>
                </>
            )}
        </>
    );
};

export default ProductListPage;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    OrderContainer,
    OrdererContainer,
    OrdererInfo,
    OrderInfo,
    OrdererName,
    OrdererAddr,
    OrdererPoint,
    OrderInput,
    OrderBtn,
    PayBtn,
} from "../../style/Product/OrderFrom";
import ProductAxios from "../../axios/ProductAxios"

const OrderFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { productName, quantity, totalPrice } = location.state || {};
    const { cart,totalAmount } = location.state || {};

    // 총 수량 계산
    const totalQuantity = cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;



    // 결제 페이지로 이동하는 함수
    const handlePayment = async() => {
        // navigate('/purchase', { state: { 
        //     cart, 
        //     totalAmount, // 총 금액
        //     totalQuantity // 총 수량
        // }});
        const res = await ProductAxios.doPurchase(totalAmount);
        console.log("결제 결과 : ", res);
        if (res.data === true) {
            alert("결제가 완료되었습니다.")
        } else {
            alert("결제 실패!! 잔액을 확인하세요.")
        }
    };

    return (
        <Container>
            <OrdererContainer>
                <OrdererInfo>주문자 정보</OrdererInfo>
                <OrdererName>
                    <span>이름</span><br />
                    <input placeholder='이름을 입력해주세요.' />
                </OrdererName>
                <OrdererAddr>
                    <span>배송지</span><br/>
                    <div>
                        <input placeholder='주소'/>
                        <button>우편번호 검색</button>
                    </div>
                    <input placeholder='상세주소를 입력해 주세요.'></input>
                </OrdererAddr>
                <OrdererPoint>
                    <span>포인트 사용</span>
                    <div>
                        <input placeholder='0' disabled/>
                        <button>전액 사용</button>
                    </div>
                </OrdererPoint>
            </OrdererContainer>
            <OrderContainer>
                <OrderInfo>주문 정보</OrderInfo>
                <hr />
                <OrderInput>
                    <div>상품명</div>
                    <div>{productName}</div>
                </OrderInput>
                <OrderInput>
                    <div>총 수량</div>
                    <div>{totalQuantity || quantity} 개</div>
                </OrderInput>
                <OrderBtn>무료배송</OrderBtn>
                <OrderInput>
                    <div>총 금액</div>
                    <div>{totalAmount && totalAmount.toLocaleString()}원</div>
                </OrderInput>
                <PayBtn onClick={handlePayment}>결제하기</PayBtn>
            </OrderContainer>
        </Container>
    );
};

export default OrderFormPage;

import AxiosApi from "../../api/AxiosApi";
import styled from "styled-components";
import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GridContainer,GridItem } from "../../style/Shop/Shop-UserList";
import testimg from "../../images/testimg.jpeg";
import UserSearch from "../shop/UserSearch";
import { getSearchedArtists } from "../../api/AxiosApi";
const MAX_ITEMS = 3;
const ITEM_HEIGHT = 230; // ex) 상품높이

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const Button = styled.button`
    border-radius: 15px;
    border: none;
    border: 1px solid #97b0aa;
    font-weight: 600;
    font-size: 12px;
    padding: 8px 20px;
    margin: 20px;
`;

const UserList = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [list, setList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
            const fetchSearchedArtists = async () => {
                const searchedArtists = await getSearchedArtists(searchQuery);
                console.log(searchedArtists);
                setList(searchedArtists);
            };
            fetchSearchedArtists();
    }, []);

    useEffect(() => {
        
        if (searchQuery.trim() !== "") {
            const fetchSearchedArtists = async () => {
                const searchedArtists = await getSearchedArtists(searchQuery);
                console.log(searchQuery);
                setList(searchedArtists);

            };
            fetchSearchedArtists();
        }
    }, [searchQuery]); // 검색 쿼리가 변경될 때마다 데이터를 다시 불러옵니다.

    

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    // 총 높이 계산
    const ContainerHeight = () => {
        const lines = Math.ceil(list.length / MAX_ITEMS); // 전체 아이템 수를 한 줄당 아이템 수로 나눠 필요한 줄 수 계산
        const visibleLines = isExpanded ? lines : 2; // 표시할 줄 수
        return visibleLines * ITEM_HEIGHT; // 표시할 줄 수 X 아이템 높이 = 총 높이
    };
    
    return (
        <>
            <UserSearch 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <GridContainer style={{ maxHeight: `${ContainerHeight()}px`, overflow: 'hidden' }}>
                {list.map((data, index) => (
                <GridItem key={index} onClick={() => handleProductClick(data.productId)}>
                    <img alt="testimg" src = {testimg} style={{width:"200px",height:"200px"}}/>
                    <p>{data.productId}</p>
                </GridItem>
                ))}
            </GridContainer>
            <ButtonContainer>
            {list.length > MAX_ITEMS * 2  && (
                <Button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "숨기기" : "더보기"}
                </Button>
            )}
            </ButtonContainer>
        </>
    );
};
export default UserList;


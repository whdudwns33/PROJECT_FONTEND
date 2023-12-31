import React from "react";
import styled from "styled-components";
import AxiosApi from "../../axios/ProductAxios";
import { useState, useEffect } from "react";

const ArtistContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  padding: 10px;
`;

const ArtistBox = styled.div`
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 8px;
    border: none;
    background-color: #ddd;
    cursor: pointer;
    font-weight: bolder;
    &:hover {
        color: #008bff;
        font-weight: bolder;
    }
`;
const ArtistItem = styled.div`
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 16px;
    margin-left: 8px;
    border: none;
    
    cursor: pointer;
`

const ArtistListPage = ({ onArtistSelect }) => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const artistList = async () => {
            try {
                const response = await AxiosApi.productGet();
                const uniqueArtists = response.data.filter((artist, index, self) =>
                    index === self.findIndex((t) => (
                        t.artistName === artist.artistName
                    ))
                );
                setArtists(uniqueArtists);
            } catch (error) {
                console.error('데이터를 불러오는데 실패했습니다', error);
            }
        };
        artistList();
    }, []);
    
    return (
        <>
        <ArtistContainer>
            <div>
            <ArtistBox onClick={() => onArtistSelect(null)}>크리에이터</ArtistBox>
            {artists.map((artist, index) => (
            <ArtistItem key={index} 
            onClick={() => onArtistSelect(artist.artistName)}>
                {artist.artistName}
            </ArtistItem>
            ))}
            </div>
        </ArtistContainer>
        </>
    );
};


export default ArtistListPage;
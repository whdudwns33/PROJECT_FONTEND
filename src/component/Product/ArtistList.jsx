import AxiosApi from "../../axios/ProductAxios";
import { useState, useEffect } from "react";
import { ArtistContainer,ArtistText,Artists } from "../../style/Product/Artist";

const ArtistList = ({ onArtistSelect}) => {
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
            <ArtistText>Artist</ArtistText>
            <Artists onClick={() => onArtistSelect(null)}>전체</Artists>
            {artists.map((artist, index) => (
                <div key={index} onClick={() => onArtistSelect(artist.artistName)}>
                    <Artists>{artist.artistName}</Artists>
                </div>
            ))}
            </div>
        </ArtistContainer>
        </>
    );
};
export default ArtistList;
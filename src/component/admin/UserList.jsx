import styled from "styled-components";
import PerformanceAxios from "../../axios/PerformanceAxios";
import { useState, useEffect } from "react";

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  width: 10%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 2rem;
`;

const Td = styled.td`
  height: 30px;
  border: 1px solid #ddd;
  text-align: left;
  padding: 10px;
  max-width: 50px;
  overflow: hidden;
`;

const UserList = ({ selectedButton }) => {
  //   console.log("회원 리스트 등장 : ", selectedButton);
  const [userList, setUserList] = useState([]);

  // getUserList 함수를 selectedButton이 "User"일 때만 호출합니다.
  const fetchData = async () => {
    try {
      if (selectedButton === "User") {
        const res = await PerformanceAxios.getUserList();
        if (res.status === 200) {
          console.log("회원 정보들 : ", res);
          setUserList(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedButton]);

  return (
    <>
      {selectedButton === "User" && (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>NAME</Th>
              <Th>NICKNAME</Th>
              <Th>GENDER</Th>
              <Th>EMAIL</Th>
              <Th>AGE</Th>
              <Th>POINT</Th>
              <Th>AUTHORITY</Th>
              <Th>DELETE</Th>
            </tr>
          </thead>
          <tbody>
            {userList.map((data, index) => (
              <tr key={data.index + 1}>
                <Td>{data.id}</Td>
                <Td>{data.userName}</Td>
                <Td>{data.userNickname}</Td>
                <Td>{data.userGen}</Td>
                <Td>{data.userEmail}</Td>
                <Td>{data.userAge}</Td>
                <Td>{data.userPoint}</Td>
                <Td>{data.authority}</Td>
                <Td>{index !== 0 && "delete"}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {selectedButton === "UserGraph" && {}}
    </>
  );
};

export default UserList;

import { useState } from "react";
import styled from "styled-components";
import Modal from "../component/signup/SignUpModal";

// 모달 전체 틀
export const ModalContainer = styled.div`
// Modal을 구현하는데 전체적으로 필요한 CSS를 구현
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
  font-family: 'Noto Sans KR', sans-serif;
`;

// Modal 표시시 뒷배경 처리
export const ModalBackground = styled.div`
  z-index: 1; //위치지정 요소
  position: fixed;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color: rgba(0,0,0,0.2);
  backdrop-filter: blur(6px);
  top : 0;
  left : 0;
  right : 0;
  bottom : 0;
`;

// Modal 오픈 버튼
export const ModalButton = styled.button`
  background-color: ${props => props.bgColor || 'var(--mainblue)'};
  color: ${props => props.textColor || 'white'};
  text-decoration: none;
  border: none;
  width: auto;
  height: auto;
  padding: 1rem;
  border-radius: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: grab;
`;

export const ExitButton = styled(ModalButton)`
  background-color: ${props => props.bgColor || 'var(--mainblue)'};
  color: ${props => props.textColor || 'white'};
  border-radius: 5rem;
  text-decoration: none;
  margin: 1rem;
  display : flex;
  justify-content : center;
  align-items : center;
`;

export const ModalView = styled.div.attrs((props) => ({ role: "dialog", }))` 
  // Modal창 CSS를 구현합니다.
  display: flex;
  background-color: rgba(0,0,0,0);
  align-items: center;
  flex-direction: column;
  border-radius: 2rem;
  width: auto;
  min-width: 30rem;
  max-width: 100rem;
  padding: 1rem;
  height: auto; 
  background-color: #ffffff;
    >div.desc {
      margin: 4rem;
      font-size: 1.8rem;
       }
`;

export const NoneBtnModalComponent = ({ isOpen, setIsOpen, content, customButton, close, closeButtonStyle }) => {
  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ModalContainer>
        {isOpen ? 
          <ModalBackground onClick={closeModalHandler}> 
            <ModalView onClick={(e) => e.stopPropagation()}>
              <div className='desc'>
                {content}
              </div>
              {customButton && <ExitButton onClick={closeModalHandler}>{customButton}</ExitButton>}
              <ExitButton onClick={closeModalHandler} {...closeButtonStyle}>{close}</ExitButton>
            </ModalView>
          </ModalBackground>
          : null
        }
      </ModalContainer>
    </>
  )
}

export default NoneBtnModalComponent;
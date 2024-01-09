import styled from "styled-components";

export const TabMenu = styled.li`
  background-color: #dcdcdc;
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-bottom: -50px;
  text-align: center;
  align-items: center;
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-top: 1px solid #dadada;
  z-index:1000;

  @media screen and (max-width: 700px){
    margin-top: -11px;
  }

  .submenu {
  // 기본 Tabmenu 에 대한 CSS를 구현
    //display: flex;
    justify-content: space-between;
    // heigth: 30px;
    width: calc(100% /2);
    padding: 15px;
    font-size: 18px;
    transition: 0.6s;
    border-radius: 0px 0px 0px 0px;
    display: inline-block;
  }

  .focused {
   //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: rgb(255,255,255);
    color: rgb(21,20,20);
  }

  & div.TabContent {
    text-align: center;
  }
`;

export const TabContent = styled.div`
  text-align: center;
  justify-content: center;
`;


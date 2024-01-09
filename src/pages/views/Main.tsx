import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../css/Main.module.css';
import ysuLogo from '../img/MainLogo.png';
import { MdRestaurantMenu } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";

export const Main = (): JSX.Element => {
  const navigate = useNavigate();
  
  const loginPage = () => {
    navigate("/Login");
  }

  return (
  <>
  <body className={style.body}>
    <div className={style.logoDiv}>
      <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} />

    </div>
    <div className={style.backGround}>
    <div className={style.container}>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><MdRestaurantMenu /></h2>
            </div>
            <div className={style.content}>
              <Link to="https://www.yeonsung.ac.kr/ko/582/subview.do">학식 메뉴 보러 가기</Link>
            </div>
        </div>
        <div className={style.card}>
            <div className={style.circle}>
                <h2><FaCircleUser/></h2>
            </div>
            <div className={style.content}>
                <a onClick={ loginPage }>학식 시스템 로그인</a>
             </div>
 
        </div>
    </div> 
    </div>
    <div className={style.footer}>
      <span>경기도 안양시 양화로 37번길 34 연성대학교 Tel : 031-441-5994-5 / Fax : 031-441-1475</span>
      <span>Copyright 2023 YEONSUNG UNIVERSITY All Rights Reserved</span>
    </div>
    </body>
  </>
)};

export default Main;


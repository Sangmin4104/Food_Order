import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import MdStyle from '../css/MenuDetail.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { Cookies, useCookies } from 'react-cookie';
import WrongApproach from './WrongApproach';
import { Button, message } from "antd";
import styled from 'styled-components';

export const MenuDetail = (): JSX.Element => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']);
    const [section, setSection] = useState < {
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number
    } > ();


    const [userInfo, setUserInfo] = useState < {
        u_id: string,
        u_name: string,
        u_dept: string
    } > ({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    const menuId = location.state ? location.state.menu_id : 1;
    const menuPack = location.state ? location.state.menu_pack : 1;
    // localStorage에서 유저 정보 가져오기
    const userId = localStorage.getItem("user_id") || '';
    const userName = localStorage.getItem("user_name") || '';
    const userDept = localStorage.getItem("user_dept") || '';

    // const Button = styled.button`

    //     margin-top:10px;
    //     justify-content: center;
    //     align-items: center;
    //     text-align: center;
    //     display: inline-block;
    //     border-radius: 10px;
    //     border: 0px;
    //     background-color: rgb(80, 176, 209);
    //     font-size: 1rem;
    //     padding: 10px;
    //     height: 100%;
    //     color: white;

    // `;

    useEffect(() => {

        setUserInfo({ u_id: userId, u_name: userName, u_dept: userDept });

        console.log(menuId);
        if (menuId !== undefined) {
            // menu_id가 정의되어 있으면 해당 메뉴 데이터를 가져오기
            axios.get(`/menu/${menuId}`)
                .then((res) => {
                    setSection(res.data);
                    console.log("데이터 가져오기 성공!");
                    console.log(res.data);
                })
                .catch((error) => {
                    console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
                });
        }
    }, [location.state, localStorage]);


    const handleAddToCart = (userId: string, menuId: number, isPacked: number) => {
        // 사용자 ID와 메뉴 ID를 이용해서 InsertCartDTO 객체를 생성
        const insertCartDTO = {
            menu_id: menuId,
            u_id: userId,
            is_packed: isPacked
        };

        console.log(insertCartDTO);

        // 서버로 데이터를 보냄
        axios.post('/cart/insertCart', insertCartDTO)
            .then(response => {
                console.log('Data inserted successfully');
                message.success({
                    content: '장바구니에 메뉴를 담았습니다.',
                    style: {
                        fontSize: '17px',
                    },
                });
            })
            .catch(error => {
                console.error('Failed to insert data', error);
            });
    };

    const handleLogout = () => {
        // removeCookie(userInfo.u_id as keyof typeof cookies);
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");

        setIsLoggedIn(false);
        // 로그인 페이지로 이동
        navigate('/');
    };

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);

        const timeoutId = setTimeout(() => {
            setShowModal(false);
        }, 3000);

        // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
        return () => clearTimeout(timeoutId);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {userId ? (
                <div>
                    <div id="head" className={MenuStyle.head}>
                        <Link className={MenuStyle.link} to="/Menu">
                            <BiArrowBack className={MenuStyle.faArrowLeft} />
                        </Link>
                        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                        <Link className={MenuStyle.link} to="/cart">
                            <IoCartSharp className={MenuStyle.faCartShopping} />
                        </Link>
                    </div>
                    <div className={MdStyle.menuDetail}>
                        {section && (
                            <div id={section['menu_corner']}>
                                <img id="menuDetailImg" className={MdStyle.menuDetailImg} src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                                <hr id="menuDetailHr" className={MdStyle.menuDetailHr}></hr>
                                <div className={MdStyle.menuDetailInfo}>
                                    <div className={MdStyle.menuDetailName}>{section['menu_name']}</div>
                                    <div className={MdStyle.menuDetailPrice}>가격 : {(menuPack === 1) ? (section['menu_price'] + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                </div>
                            </div>
                        )}
                        {/* <button id="reviewButton" className={MdStyle.reviewButton}
                            onClick={() => {
                                navigate('/Review', {
                                    state: {
                                        u_id: userInfo.u_id,
                                        menu_id: menuId
                                    },
                                });
                            }}>메뉴 리뷰</button> */}

                        {/* <button id="inputCart" className={MdStyle.reviewButton} onClick={() => { handleAddToCart(userInfo.u_id, menuId, menuPack); openModal(); }}> 장바구니에 담기</button> */}
                    </div>

                    <div className={MdStyle.bottom}>
                        <button className={MdStyle.cartInsertBtn} onClick={() => { handleAddToCart(userInfo.u_id, menuId, menuPack); }}>
                            장바구니에 담기
                        </button>
                    </div>
                </div>

            ) : (
                <WrongApproach />
            )}
        </>
    );
}


export default MenuDetail;
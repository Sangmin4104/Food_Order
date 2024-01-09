import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import profile from '../img/profile.png';
import list from '../img/list.png';
import logout from '../img/logout.png';
import review from '../img/review.png';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { MdLogout, MdOutlineRateReview } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import style from '../css/MyPage.module.css';
import { RiFileList3Line } from "react-icons/ri";
import { useCookies } from 'react-cookie';
import WrongApproach from './WrongApproach';
import addMenu from "../img/addMenu.png";
import lastMenu from "../img/lastMenu.png";

export const MyPage = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']);
    const [userInfo, setUserInfo] = useState < {
        u_id: string,
        u_name: string,
        u_dept: string
    } > ({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    // localStorage에서 유저 정보 가져오기
    const userId = localStorage.getItem("user_id") || '';
    const userName = localStorage.getItem("user_name") || '';
    const userDept = localStorage.getItem("user_dept") || '';

    useEffect(() => {

        console.log(userId);
        setUserInfo({
            u_id: userId,
            u_name: userName,
            u_dept: userDept
        });

    }, [localStorage]);

    const [showMyOrderList, setShowMyOrderList] = useState(false);

    const handleMyOrderListClick = () => {
        setShowMyOrderList(true);
    };

    const handleLogout = () => {
        // removeCookie(userInfo.u_id as keyof typeof cookies);
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem('activeSection');
        setIsLoggedIn(false);
        // 로그인 페이지로 이동
        navigate('/');
    };

    return (
        <>
            {userDept == 'admin' ? (
                <div>
                    <div id="head" className={MenuStyle.head}>
                        
                        <Link className={MenuStyle.link} to="/adminMenu">
                            <BiArrowBack className={MenuStyle.faArrowLeft} />
                        </Link>
                        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                        <Link className={MenuStyle.link} to="/">
                            <IoCartSharp className={MenuStyle.faCartShopping} style={{color:'transparent', cursor: 'auto'}}/>
                        </Link>
                    </div>

                    <div className={style.pageHead}>
                        관리자 마이페이지
                    </div>

                    <div className={style.myPage}>

                        <div className={style.profileDiv}>
                            <div>
                                <img className={style.profile} src={profile} />
                            </div>
                            <div className={style.userInfo}>
                                <span className={style.nameSpan}><span className={style.nameSpanUnderline}>{userInfo.u_name} 님</span></span>
                                <span className={style.deptSpan}> 관리자</span>
                            </div>
                            <div className={style.myPageButtons}>
                                <Link to='/adminMenu/menuInsert'>
                                <img src={addMenu} className={style.RiFileList3Line} />

                                    <button>메뉴 추가</button>
                                </Link>
                                <Link to='/lastMenu'>
                                <img src={lastMenu} className={style.RiFileList3Line} />
                        
                                    <button>지난 메뉴</button>
                                </Link>
                                <Link to="/" className={style.link} onClick={handleLogout}>
                                <img src={logout} className={style.RiFileList3Line} />
                             
                                    <button>로그아웃</button>
                                </Link>
                            </div>
                        </div>
                        {/* {showMyOrderList && <MyOrderList />} */}
                    </div>
                </div>
            ) : (
                <WrongApproach />
            )}
        </>
    );
}

export default MyPage;

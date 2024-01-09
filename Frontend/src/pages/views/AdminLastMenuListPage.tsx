import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from '../css/LastMenu.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import ysuLogo from '../img/ysu_logo.jpg';
import Select from "react-select"
import wrongAstyle from '../css/WrongApproach.module.css';
import WrongApproach from './WrongApproach';
import backCheck from '../img/backIcon.png';
import nextCheck from '../img/nextIcon.png';
import noMenus from '../img/noMenu.png';

export const AdminLastMenuListPage = (): JSX.Element => {
    const corner = ['S', 'B', 'F', 'P']
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menu_id, setMenuId] = useState<number>(0); // 메뉴 ID 상태 (숫자)
    const [selectedOption, setSelectedOption] = useState<any>(null); // 선택된 옵션을 저장할 상태
    const [sections, setSections] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number,
        menu_date: string
    }[]>([]);

    const userId = localStorage.getItem("user_id");
    const userName = localStorage.getItem("user_name");
    const userDept = localStorage.getItem("user_dept");

    const [originalSections, setOriginalSections] = useState<{
        menu_id: number,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: number,
        menu_regist: number,
        menu_date: string
    }[]>([]); // 초기 데이터를 저장할 상태

    const [activeSection, setActiveSection] = useState(() => {
        // localStorage에서 값을 가져오거나 기본값 'S'를 사용합니다.
        const savedSection = localStorage.getItem('activeSection');
        return savedSection || 'S';
    });

    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const getCurrentWeekRange = () => {
        const today = new Date();
        const currentDay = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDay + (currentDay === 0 ? -6 : 1));
        const endOfWeek = new Date(today);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        return {
            start: startOfWeek,
            end: endOfWeek,
        };
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (location.state && location.state.activeSection) {
            // 로그아웃 상태에서 새로운 사용자가 접속할 때, localStorage에 값이 없으면 'S'로 초기화합니다.
            setActiveSection(location.state.activeSection);
            localStorage.setItem('activeSection', 'S'); // 값이 있어도 무조건 'S'로 초기화
        } else if (!localStorage.getItem('activeSection')) {
            // 값이 없으면 무조건 'S'로 초기화
            setActiveSection('S');
            localStorage.setItem('activeSection', 'S');
        } else {
            // 페이지가 로드될 때마다 localStorage에 activeSection을 저장합니다.
            localStorage.setItem('activeSection', activeSection);
        }

        const { start, end } = getCurrentWeekRange();

        setStartDate(start);
        setEndDate(end);

        axios.get("/lastmenu", {
            params: {
                startDate: start.toISOString(),  // 시작 날짜
                endDate: end.toISOString()     // 종료 날짜
            }
        }).then((res) => {
            setSections(res.data);
            setOriginalSections(res.data);
            console.log(res);
        }).catch((error) => {
            console.error("Error fetching menu data:", error);
        });
    }, [location.state, activeSection]);

    const handleSectionClick = (section: string) => {
        setActiveSection(section);
        setSelectedOption(null);
        window.scrollTo(0, 0);
    };

    const handleLogout = () => {
        // 세션 초기화
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem('activeSection');

        setIsLoggedIn(false);

        // 로그인 페이지로 이동
        navigate('/login');
        window.alert("로그아웃 되었습니다.");
    };

    const goToMain = () => {
        navigate('/adminmain');
    }

    const filterMenusByDateRange = (menus: any[], startDate: Date, endDate: Date) => {
        const filteredMenus = menus.filter((menu) => {
            const menuDate = new Date(menu.menu_date);
            return menuDate >= startDate && menuDate <= endDate;
        });
    
        console.log('Filtered Menus:', filteredMenus);
    
        return filteredMenus;
    };

    const handleBackIconClick = () => {
        const oneWeekAgo = new Date(startDate);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
        const startOfWeek = new Date(oneWeekAgo);
        startOfWeek.setDate(oneWeekAgo.getDate() - oneWeekAgo.getDay() + (oneWeekAgo.getDay() === 0 ? -6 : 1));
    
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
    
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    
        // 현재 startDate와 endDate에 따라 메뉴 필터링
        const filteredMenus = filterMenusByDateRange(originalSections, startOfWeek, endOfWeek);
        setSections(filteredMenus);
    };
    
    const handleNextIconClick = () => {
        const today = new Date(endDate);
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 1);
    
        const startOfWeek = new Date(nextWeek);
        startOfWeek.setDate(nextWeek.getDate() - nextWeek.getDay() + (nextWeek.getDay() === 0 ? -6 : 1));
    
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
    
        setStartDate(startOfWeek);
        setEndDate(endOfWeek);
    
        // 현재 startDate와 endDate에 따라 메뉴 필터링
        const filteredMenus = filterMenusByDateRange(originalSections, startOfWeek, endOfWeek);
        setSections(filteredMenus);
    };

    const formatDateString = (date: Date) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit' } as const;
        return date.toLocaleDateString('ko-KR', options);
    };

    return (
        <>
            <head>
                <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
            </head>
            {userDept == 'admin' ? (
                <body className={style.body}>
                    <div>
                        <div id="head" className={style.head}>

                            <Link className={style.link} to="/adminMypage">
                                <BiArrowBack className={style.faArrowRightFromBracket} />
                            </Link>
                            <img id="logo" className={style.logo} src={ysuLogo} alt={"logo"} onClick={goToMain} />
                            <Link to="/login" className={style.link} >
                                <MdLogout className={style.faArrowLeft} onClick={handleLogout} />
                            </Link>

                        </div>
                    </div>

                    <div>
                        <div>
                            <nav className={style.menuNav}>
                                <ul className={style.menuUl}>
                                    {corner.map((section) => (
                                        <li key={section} className={style.li}>
                                            <a
                                                href={`#${section}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSectionClick(section);
                                                }}
                                                className={activeSection === section ? style.active : ''}
                                            >
                                                {section === 'S' && '면·분식류(S)'}
                                                {section === 'B' && '비빔밥·덮밥류(B)'}
                                                {section === 'F' && '돈까스·라이스류(F)'}
                                                {section === 'P' && '포장(P)'}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        <div className={style.selectMenu}>
                            <img id="backIcon" className={style.backIcon} src={backCheck} alt={"back"} onClick={handleBackIconClick} />
                            <h2>{`${formatDateString(startDate)} ~ ${formatDateString(endDate)}`}</h2>
                            <img id="nextIcon" className={style.nextIcon} src={nextCheck} alt={"next"} onClick={handleNextIconClick} />
                        </div>
                        {(sections.length === 0 || (sections.every(section => activeSection !== section.menu_corner) && activeSection != 'P')) && (
                            <div className={style.noMenus}>
                                <img id="noReviewsImg" className={style.noMenusImg} src={noMenus} alt={"logo"} />
                                <p>메뉴가 없습니다</p>
                                <span style={{ fontSize: '18px', marginBottom: '10px', color:'#444' }}>다른 날짜의 메뉴 확인해주세요</span>
                            </div>
                        )}
                        <div className={style.menuList} style={{ marginTop: '0px' }} >
                            {sections.length === 0 ? (
                                <> </>
                            ) : (
                                filterMenusByDateRange(sections, startDate, endDate).map((section, idx) => (
                                    <div key={`${idx}-${section['menu_corner']}`} id={section['menu_corner']} className={activeSection === section['menu_corner'] || (activeSection === 'P' && section['menu_pack'] === 1) ? style.active : style.hidden}>
                                        <button>
                                            <img src={require(`../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
                                            <hr id="menuHr" className={style.menuHr}></hr>
                                            <div className={style.menuInfo}>
                                                <div className={style.menuName} style={{ display: 'flex', flexDirection: 'row' }}>
                                                    {section['menu_name']}
                                                    {section['menu_pack'] === 1 && <span style={{ marginTop: '-2px' }}>ⓟ</span>}
                                                    &nbsp;
                                                </div>
                                                <div className={style.menuPrice}>가격 : {(activeSection === 'P' && section['menu_pack'] === 1) ? (section['menu_price'] + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : section['menu_price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                                            </div>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </body>
            ) : (
                <WrongApproach />
            )}
        </>
    );
}

export default AdminLastMenuListPage;
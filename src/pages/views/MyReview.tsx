import React, { useState, useEffect } from 'react';
import MenuStyle from '../css/Menu.module.css';
import ysuLogo from '../img/ysu_logo.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { BiArrowBack, BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';
import style from '../css/MyReview.module.css';
import axios from 'axios';
import noOrders from '../img/noOrders.png';
import WrongApproach from './WrongApproach';
import { Modal, Rate, message } from 'antd';
import styled from 'styled-components';

export const MyReview = (): JSX.Element => {
    const [menu_id, setMenuId] = useState < number > (0); // 메뉴 ID 상태 (숫자)
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const starArray = [0, 1, 2, 3, 4];
    const [score, setScore] = useState([false, false, false, false, false]);
    const [reviewCount, setReviewCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [triggerEffect, setTriggerEffect] = useState(false);
    const [myReviews, setMyReviews] = useState < {
        u_id: string,
        order_id: number,
        menu_id: number,
        review_id: number,
        review_writing: string,
        review_star: number,
        review_time: string,
        review_regist: number,
        review_img: string,
        menu_name: string,
        menu_corner: string,
        menu_price: number,
        menu_pack: number,
        menu_image: string,
        menu_sales: string,
        menu_regist: number,
    }[] > ([]);

    const [userInfo, setUserInfo] = useState < {
        u_id: string,
        u_name: string,
        u_dept: string
    } > ({
        u_id: "",
        u_name: "",
        u_dept: ""
    });

    const userId = localStorage.getItem("user_id") || '';
    const userName = localStorage.getItem("user_name") || '';
    const userDept = localStorage.getItem("user_dept") || '';

    useEffect(() => {
        document.body.style.overflow = 'auto';

        console.log(userId);
        setUserInfo({
            u_id: userId,
            u_name: userName,
            u_dept: userDept
        });

        axios.get(`/myreviews/${userId}`)
            .then((res) => {
                console.log(res.data);
                const data = res.data;
                console.log(data);
                if (data && data.length === 0) {
                    setIsLoading(false);
                    console.log("데이터 가져오기 실패!");
                } else {
                    const sortedReviews = [...data].sort((a, b) => b.order_id - a.order_id);
                    setMyReviews(sortedReviews);
                    setReviewCount(data.length);
                    console.log(data.length);
                    console.log("데이터 가져오기 성공!");
                    console.log(data);
                    setIsLoading(false);
                }

            })
            .catch((error) => {
                console.error('메뉴 데이터를 불러오는 데 실패했습니다.', error);
            });

        const orderIds = Array.from(new Set(myReviews.map(review => review.order_id)));

        if (myReviews.length > 0) {
            // 모든 주문을 기본적으로 확장되도록 초기화 (한 번만)
            const initialExpandedState: { [orderId: number]: boolean } = {};

            myReviews.forEach(review => {
                initialExpandedState[review.order_id] = true;
            });
            setExpandedOrders(initialExpandedState);
        }
        return () => {
            const isMounted = false; // 컴포넌트가 언마운트되면 isMounted 값을 false로 변경하여 setState 호출 방지
        };

    }, [triggerEffect]);

    const [expandedOrders, setExpandedOrders] = useState < { [orderId: number]: boolean } > ({});

    const toggleOrder = (orderId: number) => {
        setExpandedOrders(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    const formatOrderDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            weekday: 'short',
            hour: '2-digit',
            minute: '2-digit'
        };

        const formattedDate = date.toLocaleDateString('ko-KR', options);
        let [year, month, day, weekday, time, hour] = formattedDate.split(' ');
        year = year.slice(0, -1);
        month = month.slice(0, -1);
        day = day.slice(0, -1);

        return `${year}/${month}/${day} ${weekday} ${time} ${hour}`;
    };

    const starScore = (index: number) => {
        let star = [...score];
        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setScore(star);
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deletingReviewId, setDeletingReviewId] = useState < number | null > (null);

    // 모달 열기/닫기
    const showModal = (reviewId: number) => {
        setDeletingReviewId(reviewId);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setDeletingReviewId(null);
    };

    // 삭제 버튼 클릭 시 실행되는 함수
    const handleReviewDelete = (reviewId: number) => {
        showModal(reviewId);
    };


    const handleConfirmDelete = () => {
        if (deletingReviewId !== null) {
            // 각 reviewId에 대해 순회하며 삭제 요청 보내기
            axios.delete(`/review/delete/${deletingReviewId}/${userId}`)
                .then((res) => {
                    setTriggerEffect(prevState => !prevState);
                    // 서버로부터 성공적인 응답을 받으면, 현재 리뷰를 목록에서 제거
                    message.success("리뷰가 삭제되었습니다.");
                    console.log(res);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("리뷰 삭제 중 오류:", error);
                    message.error("리뷰 삭제 중 오류가 발생했습니다.");
                })
                .finally(() => {
                    setIsModalVisible(false);
                    setDeletingReviewId(null);
                });
        }
    };


    const handleLogout = () => {
        // 세션 초기화
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_dept");
        localStorage.removeItem("isLoggedIn");

        setIsLoggedIn(false);
        // 로그인 페이지로 이동
        navigate('/');
    };

    const CustomModal = styled(Modal)`
        top: 250px;

        .ant-btn-primary {
            background-color:rgb(80, 176, 209);
        }

        @media screen and (max-width: 700px) {
            top: 300px;
            
            .ant-modal-content {
                width: 80%;
                margin: 0 auto;
            }
        }
    `;

    return (
        <>
            {userId ? (
                <div>
                    <div id="head" className={MenuStyle.head}>
                        <Link className={MenuStyle.link} to="/MyPage">
                            <BiArrowBack className={MenuStyle.faArrowLeft} />
                        </Link>
                        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
                        <Link className={MenuStyle.link} to="/">
                            <IoCartSharp className={MenuStyle.faCartShopping} style={{ color: 'transparent' }} />
                        </Link>
                    </div>

                    <div className={style.pageHead}>
                        리뷰 관리
                    </div>

                    <div className={style.MyOrderList}>
                        {myReviews.length !== 0 ? (
                            <div className={style.orderContainer}>
                                <span className={style.reviewCount}><span className={style.countHead}>내가 작성한 리뷰</span> <span style={{ fontWeight: '500' }}>{reviewCount}</span> 개</span>
                            </div>
                        ) : (
                            <span></span>
                        )}

                        {isLoading ? (
                            <p>&nbsp;</p>
                        ) :
                            myReviews.length === 0 ? (
                                <div className={style.noReviews}>
                                    <img id="noReviewsImg" className={style.noReviewsImg} src={noOrders} alt={"logo"} />
                                    <p>작성한 리뷰가 없습니다</p>
                                </div>
                            ) : (
                                Array.from(new Set(myReviews.map(review => review.order_id))).map(orderId => (
                                    <div key={orderId} className={style.orderContainer}>
                                        {/* 주문 번호를 클릭하여 상세 정보를 펼치거나 접는 부분 */}
                                        <div className={style.orderHeader}>

                                            <span style={{ fontSize: '19px' }}>
                                                &nbsp;주문 번호 {orderId}
                                            </span>

                                            {/* 주문 날짜 */}
                                            {Array.from(new Set(myReviews.filter(review => review.order_id === orderId).map(order => order.review_time))).map(orderDate => (
                                                <div key={`${orderId}-${orderDate}`} className={style.orderDateHeader}>
                                                    {/* 날짜 표시 */}
                                                    <p className={style.orderDate}>
                                                        &nbsp;&nbsp;&nbsp;{formatOrderDate(orderDate)}
                                                        {myReviews
                                                            .filter(review => review.order_id === orderId && review.review_time === orderDate)
                                                            .map(review => (
                                                                <button className={style.deleteBtn}
                                                                    key={review.review_id}
                                                                    onClick={() => handleReviewDelete(review.review_id)}
                                                                >
                                                                    삭제
                                                                </button>
                                                            ))}
                                                    </p>

                                                    {myReviews
                                                        .filter(review => review.order_id === orderId && review.review_time === orderDate)
                                                        .map((myReview, idx) => (
                                                            <><div key={`${orderId}-${orderDate}-${idx}`} className={style.menuItem}>

                                                                {/* 메뉴 상세 정보 표시 */}
                                                                <div className={style.menuImage}>
                                                                    <img src={require(`../img/${decodeURIComponent(myReview['menu_image'])}`)} alt={myReview['menu_name']} />
                                                                </div>
                                                                <div className={style.menuDetails}>
                                                                    <div className={style.menuName}>{myReview.menu_name}</div>
                                                                    <div className={style.menuCorner}>• 코너 : {myReview.menu_corner}</div>

                                                                    <div className={style.menuPrice}>
                                                                        <span style={{ fontWeight: '500' }}>{myReview.menu_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                                                        원
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            </>
                                                        ))}


                                                    <>
                                                        {myReviews
                                                            .filter(review => review.order_id === orderId && review.review_time === orderDate)
                                                            .map((myReview, idx) => (
                                                                <>
                                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
                                                                        <div className={style.Review}>
                                                                            {myReview['review_img'] && (
                                                                                <div className={style.reviewImage}>
                                                                                    <img src={require(`../img/${decodeURIComponent(myReview['review_img'])}`)} alt={myReview['menu_name']} />
                                                                                </div>)}
                                                                            <div className={style.reviewStar}>
                                                                                &nbsp;

                                                                                <Rate
                                                                                    allowHalf={false}
                                                                                    count={5} // 별 개수
                                                                                    value={myReview.review_star} // 현재 평점 값
                                                                                    style={{ fontSize: '20px', margin: '10px 0' }}
                                                                                />

                                                                                &nbsp; {myReview.review_star}.0
                                                                            </div>

                                                                            <div className={style.reviewWriting}>&nbsp;{myReview.review_writing}</div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ))
                                                        }
                                                    </>

                                                    <CustomModal
                                                        title="리뷰 삭제"
                                                        visible={isModalVisible}
                                                        onOk={handleConfirmDelete}
                                                        onCancel={handleCancel}
                                                        okText="삭제"
                                                        cancelText="취소"
                                                    >
                                                        <p>리뷰를 삭제하시겠습니까?</p>
                                                    </CustomModal>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                </div>
            ) : (
                <WrongApproach />
            )}
        </>
    );
}

export default MyReview;
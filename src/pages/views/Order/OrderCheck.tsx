import { useEffect, useState } from "react";
import { OrderDetail, Orders } from "../Order/state/order.state";
import axios from "axios";
import "../../css/Check.css";
import { IoHomeSharp } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import React from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Cart } from "../Cart/state/cart.state";
import { BiArrowBack } from "react-icons/bi"
import { Radio, Space } from "antd";
import MenuStyle from "../../css/Menu.module.css";

export const OrderCheck = (): JSX.Element => {
    const navigate = useNavigate();
    const [cartList, setCartList] = useState<Cart[]>([]);
    const [orderList, setOrderList] = useState<Orders[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const userId = localStorage.getItem('user_id');

    // 장바구니 목록 불러오기  
    useEffect(() => {
        axios.get(`/cart/list/${userId}`).then((res) => {
            setCartList(res.data);
            setIsLoading(false);
        })
    }, []);

    //총 수량, 총 금액
    const totalQuantity = cartList.reduce((totalQ, cart) => totalQ + cart.quantity, 0);
    const totalPrice = cartList.reduce((totalQ, cart) => totalQ + cart.cart_price * cart.quantity, 0);
    const totalPriceStr = totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    //결제수단 선택 라디오버튼
    const [radioValue, setRadioValue] = useState("simple"); //기본값 간편결제
    const onChange = (e: any) => {
        setRadioValue(e.target.value);
    };

    const orderInfo = {
        ...orderList,
        order_id: undefined,
        u_id: userId,
        total_quantity: totalQuantity,
        total_price: totalPrice,
        order_date: undefined
    };

    // 주문하기 버튼 클릭시 선택한 결제 모듈 호출(onClickPayment)
    const handlePayment = () => {
        localStorage.setItem('totalPrice', totalPrice.toString());
        localStorage.setItem('totalQuantity', totalQuantity.toString());
        if (radioValue === "kakao") {
            onClickKaKaoPayment();
        } else if (radioValue === "toss") {
            onClickTossPayment();
        } else if (radioValue === "simple") {
            onClickSimplePayment();
        }
    };

    // 결제 아임포트
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);

    // 모바일 결제시 리디렉션 될 경로
    const mRedirectUrl = window.location.origin + "/order/complete";

    //카카오페이 결제
    const onClickKaKaoPayment = async () => {
        var IMP = window.IMP;
        IMP.init('imp28705024');
        IMP.request_pay({
            pg: "kakaopay.TC0ONETIME",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`,
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_email: "test@portone.io",
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            m_redirect_url: mRedirectUrl,
        }, async function (rsp) { //PC 결제시 callback
            if (rsp.success === true) {  // success = true일 경우 주문 insert, 장바구니 비우고 주문완료 페이지로
                await axios.post(`/order/insert`, orderInfo);
                await Promise.all([
                    axios.delete(`/cart/drop/${userId}`),
                    axios.get(`/order/list/${userId}`).then((orderListRes) => setOrderList(orderListRes.data)),
                ]);
                navigate("/order/complete")
            }
            if (rsp.success === false) { // 취소시 이전 페이지(주문확인 페이지로) 
                navigate("/order/check");
            }
        });
    }

    //토스페이
    const onClickTossPayment = () => {
        var IMP = window.IMP;
        IMP.init('imp28705024');

        IMP.request_pay({
            pg: "tosspayments",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`,
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_email: "test@portone.io",
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            m_redirect_url: mRedirectUrl,
        }, async function (rsp) {
            if (rsp.error_code === "F400") { // F400 결제 취소 (이전 페이지로)
                navigate("/order/check");
            } else {
                await axios.post(`/order/insert`, orderInfo);
                await Promise.all([
                    axios.delete(`/cart/drop/${userId}`),
                    axios.get(`/order/list/${userId}`).then((orderListRes) => setOrderList(orderListRes.data)),
                ]);
                navigate("/order/complete")
            }
        });
    }

    //간편결제
    const onClickSimplePayment = () => {
        var IMP = window.IMP;
        IMP.init('imp28705024');

        IMP.request_pay({
            pg: "kcp.AO09C",
            pay_method: "card",
            merchant_uid: `mid_${new Date().getTime()}`,
            name: "주문명:결제테스트",
            amount: totalPrice,
            buyer_email: "test@portone.io",
            buyer_name: "구매자이름",
            buyer_tel: "010-1234-5678",
            buyer_addr: "서울특별시 강남구 삼성동",
            buyer_postcode: "123-456",
            m_redirect_url: mRedirectUrl,
        }, async function (rsp) {
            if (rsp.success === true) {
                await axios.post(`/order/insert`, orderInfo);
                await Promise.all([
                    axios.delete(`/cart/drop/${userId}`),
                    axios.get(`/order/list/${userId}`).then((orderListRes) => setOrderList(orderListRes.data)),
                ]);
                navigate("/order/complete")
            }
            if (rsp.success === false) {
                navigate("/order/check")
            }
        });
    }

    //뒤로가기 버튼(장바구니 페이지로)
    const backCart = () => {
        navigate("/cart");
    }

return (
        <>
            <div className="body">
                <div className="cartTop">

            <Link className={MenuStyle.link} to="/cart">
              <BiArrowBack className={MenuStyle.faArrowLeft} />
            </Link>
            <p className="topTxt"> 주문 확인</p>
            <Link className={MenuStyle.link} to="/menu">
              <IoHomeSharp className={MenuStyle.faArrowLeft} />
            </Link>
                </div>
                <div className="chkContent">
                    <div className="chkInfoBox">
                        <div className="chkInfoBoxTop">
                            <div className="chkInfoTxt">
                                상품 정보
                            </div>
                        </div>
                        <div className="chkMenuBox">
                            {cartList.map((cart) => (
                                <div className="chkInfoDiv" key={(cart.menu_id, cart.is_packed)}>

                                    <div className="chkMenuImgDiv">
                                        <div>
                                            <img
                                                className="chkMenuImg"
                                                src={require(`../../img/${decodeURIComponent(cart['menu_image'])}`)}
                                                alt={cart['menu_name']}
                                            />
                                        </div>
                                    </div>
                                    <div style={{ width: "100%", marginTop: "10px" }}>
                                        <div className="chkMenuInfo">
                                            <div style={{ display: "flex" }}>
                                                {cart.is_packed === 1 ? (
                                                    <div className="chkMenuName">{cart.menu_name} ⓟ</div>
                                                ) : (
                                                    <div className="chkMenuName">{cart.menu_name}</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="chkMenuPrice">
                                                    {(cart.cart_price * cart.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
                                                </div>
                                            </div>
                                        </div>
                                        {/* 주문 상세 정보 */}
                                        <div>
                                            <div className="chkMenuInfoBox">
                                                <div className="chkMenuInfoBoxQ">• 수량 : {cart.quantity}개 </div>
                                                {cart.is_packed === 0 ? (
                                                    <div className="chkMenuInfoBoxH">• 방법 : 식당 </div>
                                                ) : (
                                                    <div className="chkMenuInfoBoxH">• 방법 : 포장 </div>
                                                )}
                                                <div className="chkMenuInfoBoxC">• 코너 : {cart.menu_corner} </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="chkPaymentBox">
                        <div className="chkPaymentTop">
                            <div className="chkPaymentTxt" >
                                결제수단
                            </div>
                        </div>
                        <div className="chkPaymentRadioBox">
                            <div className="chkPaymentDiv">
                                <Radio.Group onChange={onChange} value={radioValue}>
                                    <Space direction="vertical">
                                        <div className="SimpleRadio"><Radio value={"simple"}>간편결제</Radio></div>
                                        <div className="kakaoRadio"><Radio value={"kakao"}><div className="kakaoIcon"></div></Radio></div>
                                        <div className="TossRadio"><Radio value={"toss"}>토스페이</Radio></div>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottomBox">
                    <div className="priceBox">
                        <div className="priceTxt">
                            총 수량 {totalQuantity}개
                        </div>
                        <div className="totalPrice">
                            총 주문금액 {totalPriceStr}원
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <button className="orderBtn" onClick={handlePayment} disabled={totalQuantity === 0}>
                        {totalPriceStr}원 결제하기
                    </button>
                </div>
            </div>

        </>
    );
}
export default OrderCheck;
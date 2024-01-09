import { useEffect, useState } from "react";
import { OrderDetail, Orders } from "../Order/state/order.state";
import axios from "axios";
import "./css/complete.css";
import MenuStyle from '../../css/Menu.module.css';
import { IoHomeSharp } from "react-icons/io5";
import { LiaCheckCircle } from "react-icons/lia";
import React from "react";
import WrongApproach from '../WrongApproach';
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";

export const OrderComplete = (): JSX.Element => {
  const [orderList, setOrderList] = useState < Orders[] > ([]);
  const [orderDetail, setOrderDetail] = useState < OrderDetail[] > ([]);
  const [searchParams] = useSearchParams(); //URL에서 파라미터 검색하기
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  //localStorage로 받아온 총 수량과 총 금액 get
  const totalQuantity = localStorage.getItem('totalQuantity');
  const totalPrice = localStorage.getItem('totalPrice');

  const orderInfo = {
    ...orderList,
    order_id: undefined,
    u_id: userId,
    total_quantity: totalQuantity,
    total_price: totalPrice,
    order_date: undefined
  };

  //성공정으로 결제했을 경우 
  //주문 insert, 장바구니 비우기, 주문 내역 가져오기
  const handleOrder = async () => {
    try {
      await axios.post("/order/insert", orderInfo);
      await Promise.all([
        axios.delete(`/cart/drop/${userId}`),
        axios.get(`/order/list/${userId}`).then((orderListRes) => setOrderList(orderListRes.data)),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  //모바일 결제후 리디렉션 됐을 때 searchParam(URL Param)의 imp_success가 true(성공)일 경우 handleOrder()실행
  useEffect(() => {
    if (searchParams.get("imp_success") === 'true') {
      handleOrder();
    } else if (searchParams.get("imp_success") === 'false' || searchParams.get("error_code") === "F400") {
      navigate("/order/check");
    }
  }, [searchParams]);

  // 주문 목록
  useEffect(() => {
    document.body.style.overflow = 'auto';
    axios.get(`/order/list/${userId}`).then((res) => {
      setOrderList(res.data);
      console.log(userId);
      console.log(res.data);
    })

  }, []);

  // 주문 상세 정보 가져오기
  useEffect(() => {
    if (orderList.length > 0) {
      const orderId = orderList[0].order_id;
      console.log(orderId);
      axios.get(`/order/detail/${orderId}/${userId}`).then((res) => {
        setOrderDetail((prevOrderDetail) => [...prevOrderDetail, res.data]);
        setOrderDetail([res.data]); // 새로운 주문 내역으로 업데이트
      });
    }
  }, [orderList]);

  return (
    <div className="body">
      {userId ? (
        <div>
          {orderList.map((order, index) => (
            <div className="completeBody" key={order.order_id}>

              <div className="orderTop">
                <Link className={MenuStyle.link} to="/Menu">
                  <BiArrowBack className={MenuStyle.faArrowLeft} style={{ color: 'transparent', cursor: 'default' }} />
                </Link>
                <p className="topTxt">주문완료</p>
                <Link className={MenuStyle.link} to="/Menu">
                  <IoHomeSharp className={MenuStyle.faArrowLeft} style={{ color: 'white' }} />
                </Link>
              </div>

              <div className="odContent">
                <div className="cplBox">
                  <div className="txt">
                    <div className="oIcon"><LiaCheckCircle className="checkIcon" fontSize="4em" color="rgb(80, 176, 209)" /></div>
                    <div className="ocTxt">주문이 완료되었습니다.</div>
                    <div className="oTxt">주문일시: {order.order_date}</div>
                    <div className="oTxt">주문번호: {order.order_id}</div>
                  </div>
                </div>

                <div className="infoBox">

                  <div className="infoBoxTop">
                    <div className="orderInfoTxt"> 주문 상세</div>
                  </div>

                  <div className="odMenuBox">
                    {orderDetail[0] && orderDetail[0].length > 0 ? (
                      orderDetail[0].map((detail) => (
                        <div className="odInfoDiv" key={detail.order_detail_id}>


                          <div className="odMenuImgDiv">
                            <div><img className="odMenuImg" src={require(`../../img/${decodeURIComponent(detail['menu_image'])}`)}
                              alt={detail['menu_name']} /> </div>
                          </div>


                          <div style={{ width: "100%", marginTop: "10px" }}>
                            <div className="odMenuInfo">
                              <div style={{ display: "flex" }}>
                                {detail.is_packed === 1 ? (
                                  <div className="odMenuName">{detail.menu_name}ⓟ</div>
                                ) : (
                                  <div className="odMenuName">{detail.menu_name}</div>
                                )}
                              </div>
                              <div>
                                <div className="odMenuPrice"> {detail.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                              </div>
                            </div>

                            <div>
                              <div className="orderMenuInfoBox">
                                <div>• 수량 : {detail.quantity}개 </div>
                                {
                                  detail.is_packed === 0 ? (
                                    <div>• 방법 : 식당 </div>
                                  ) : (
                                    <div>• 방법 : 포장 </div>
                                  )}
                                <div>• 코너 : {detail.menu_corner} </div>
                              </div>
                            </div>

                          </div>

                        </div>
                      ))
                    ) : (
                      <p>주문 상세 내역이 없습니다.</p>
                    )}

                    <div className="odPriceBox">
                      <div className="odTotalPriceTxt"> 총 결제금액</div>
                      <div className="odTotalPrice"> {order.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <WrongApproach />
      )}
    </div>
  );
}
export default OrderComplete;
import { Avatar, Button, Card, Divider, Dropdown, List, Rate, Result, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react"
import { ReviewList } from "../state/review";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import Rlstyle from '../../css/ReviewList.module.css';
import { format } from 'date-fns';
import ysuLogo from '../../img/ysu_logo.jpg';
import noReviews from '../../img/noReview.png';
import { ReviewWritePage } from "./ReviewWritePage";
import { MenuReviewTab } from "../MenuReviewTab";
import { BsFillPersonFill } from "react-icons/bs";
import { IoCartSharp } from "react-icons/io5";
import { BiArrowBack } from "react-icons/bi";

export const ReviewListPage = (): JSX.Element => {
  const [reviews, setReviews] = useState<{
    u_id: string,
    u_name: string;
    menu_id: number,
    review_id: number,
    review_writing: string,
    review_star: number,
    review_time: Date,
    order_id: number,
    review_regist: number,
    review_img: string
  }[]>([]);

  const [triggerEffect, setTriggerEffect] = useState(false);

  const [menu_id, setMenu_id] = useState<{
    menu_id: number,
  }>();

  const [user_id, setUser_id] = useState(null)

  const location = useLocation();
  const menuId = location.state ? location.state.menu_id : 1;
  const userId = localStorage.getItem('user_id') || '';

  useEffect(() => {
    setMenu_id(menuId);
    console.log(menuId, userId);
  });

  const { Meta } = Card;

  const navigate = useNavigate();

  console.log(menuId);

  const menuPage = () => {
    navigate("/menu");
  }

  const formattedDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, 'yyyy.MM.dd HH:MM');
  };

  // 리뷰 불러오기
  useEffect(() => {
    axios.get(`/menu/${menuId}/review`)
      .then((res) => {
        const review_id = res.data.review_id;
        setReviews(res.data);
        console.log(res.data);
        console.log(review_id);
      })
  }, [triggerEffect]);


  const handleReviewDelete = (reviewId: number) => {
    // 각 reviewId에 대해 순회하며 삭제 요청 보내기
    axios.delete(`/review/delete/${reviewId}/${userId}`)
      .then((res) => {
        setTriggerEffect(prevState => !prevState);
        // 서버로부터 성공적인 응답을 받으면, 현재 리뷰를 목록에서 제거
        message.success("리뷰가 삭제되었습니다.");
        console.log(res);

      })
      .catch((error) => {
        console.error("리뷰 삭제 중 오류:", error);
        message.error("리뷰 삭제 중 오류가 발생했습니다.");
      });
  };

  const ReviewWritePage = () => {
    navigate(`/menu/review/write`, {
      state: {
        menu_id: menuId,
        user_id: userId
      }
    })
  }

  return (
    <>
      <div id="head" className={MenuStyle.head}>
        <Link className={MenuStyle.link} to="/Menu">
          <BiArrowBack className={MenuStyle.faArrowLeft} />
        </Link>
        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
        <Link className={MenuStyle.link} to="/">
          <IoCartSharp className={MenuStyle.faCartShopping} />
        </Link>
      </div>

      {reviews.length === 0 && reviews.filter(review => review.review_regist === 0) ? (
        <>
          <div className={Rlstyle.noReviews}>
                <img id="noOrdersImg" className={Rlstyle.noReviewsImg} src={noReviews} alt={"logo"} />
                <p>해당 메뉴의 리뷰가 없습니다</p>
            </div>
          {/* <Result
            style={{ marginTop: "100px" }}
            status="warning"
            title="해당 메뉴의 리뷰가 없습니다."
            extra={[
              // <><Button onClick={ReviewWritePage}>리뷰 적기</Button><Button onClick={menuPage}>메뉴</Button></>
            ]} />*/}
          
        </>
      ) : (
        <Card className={Rlstyle.reviewCard}>
            {reviews.map((reviewData) => (
            <div className={Rlstyle.reviewItem}>
              <div className={Rlstyle.reviewBox}>

                <div style={{ display: "flex", alignItems:"center" }}>

                <div>
                  <div className={Rlstyle.reviewInfo} >
                    <div className={Rlstyle.reviewFix}>
                      <div className={Rlstyle.userName}>{reviewData.u_name}</div> {/* 이름 */}
                      <div id="reviewTime" className={Rlstyle.reviewTime} style={{ fontSize: "10px" }}>{formattedDate(reviewData.review_time)}</div> {/* 날짜 */}

                    </div>
                    <div style={{display:"flex", alignItems:"center"}}> {/* 별점 */}
                      <Rate id="reviewRate" className={Rlstyle.reviewRate} disabled defaultValue={reviewData.review_star}></Rate>

                    </div>
                  </div>
                </div>
                </div>

                <div className={Rlstyle.contentBox}>
                  {/* 글 */}
                  <div
                    id="reviewWriting"
                    className={Rlstyle.reviewWriting}
                    style={{
                      paddingBottom: reviewData.review_img ? "5%" : "15%",
                      width: reviewData.review_img ? "60%" : "100%"
                    }}
                  >
                    {reviewData.review_writing}
                  </div>

                  <div className={Rlstyle.reviewImgList}> {/* 사진 */}
                    {reviewData.review_img && (
                      <img
                        className={Rlstyle.reviewImg}
                        src={require(`../../img/${decodeURIComponent(reviewData.review_img)}`)}
                        alt="Review"
                      style={{
                        paddingBottom: reviewData.review_img ? "15%" : "0%"
                      }}
                      />
                    )}
                  </div>

                </div>
              </div>
            </div>

          ))}
        </Card >
      )}</>
  )
}
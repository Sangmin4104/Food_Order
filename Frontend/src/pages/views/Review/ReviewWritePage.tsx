import { Button, Card, Divider, Input, Rate, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import MenuStyle from '../../css/Menu.module.css';
import { BiArrowBack } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import ysuLogo from '../../img/ysu_logo.jpg';
import RwStyle from '../../css/ReviewWrite.module.css'
import imageAdd from '../../img/image_add.png'

export interface IProps {
  detail: { u_id: string, order_id: number, menu_id: number, review_writing: string; review_star: number };
}

// 허용가능한 확장자 목록
const ALLOW_FILE_EXTENSION = "jpg, jpeg, png, bmp";
const FILE_SIZE_MAX_LIMIT = 10 * 1024 * 1024;  // 10MB

export const ReviewWritePage = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [section, setSection] = useState < {
    menu_id: number,
    menu_name: string,
    menu_corner: string,
    menu_price: number,
    menu_pack: number,
    menu_image: string,
    menu_sales: number,
    menu_regist: number
  } > ();;
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const [review_img, setReview_img] = useState('');
  const [previewImg, setPreviewImg] = useState('');

  const menuId = location.state.menu_id;
  const userId = location.state.user_id;
  const orderId = location.state.order_id;

  const [inputs, setInputs] = useState < IProps['detail'] > ({
    u_id: userId,
    order_id: orderId,
    menu_id: menuId,
    review_writing: '',
    review_star: 0,
  })

  const { review_writing, review_star } = inputs;

  const onChange = (e: any) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value

    });
  };

  const handleStarChange = (value: number) => {
    setInputs({
      ...inputs,
      review_star: value,
    });
  };

  // 이미지 업로
  const baseUrl = '/Users/seoyoung/Documents/ysu/src/pages/img';

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    if (!review_writing.trim()) {
      message.error("리뷰를 작성해주세요.");
      return;
    } else if (review_star === 0) {
      message.error("별점을 입력해주세요.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('u_id', userId);
      formData.append('order_id', orderId);
      formData.append('menu_id', menuId);
      formData.append('review_img', review_img);
      formData.append('review_writing', inputs.review_writing);
      formData.append('review_star', (inputs.review_star).toString());
      console.log(formData);
      console.log(review_img);
      console.log(review_writing);
      axios.post(`/menu/review/write`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          message.success("리뷰를 등록했습니다.");
          console.log(res.data);
          if (res.status === 200) {
            navigate(`/myReview`)
          }
        })
    } catch (err) {
      message.error("리뷰 등록에 실패했습니다.");

      console.error(err);
    }
  };


  useEffect(() => {
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
    };
  }, [menuId])

  // 이미지 삭제
  const deleteImgHandler = (e: any): void => {
    e.preventDefault();
    setPreviewImgUrl('');
    setReview_img('');
    e.target.value = null;
  };

  // 이미지 확장자 확인
  const fileExtensionValid = ({ name }: { name: string }): boolean => {
    if (!(ALLOW_FILE_EXTENSION.indexOf(name.split('.').pop() || '') > -1) || name === '') {
      return false;
    }
    return true;
  }

  // 이미지 파일 이름 생성 함수
  const generateFileName = (u_id: string) => {
    // 랜덤 문자열을 생성하는 함수
    const generateRandomString = (length: number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    };

    // u_id에서 공백을 언더스코어(_)로 대체
    const sanitizedMenuName = u_id.replace(/\s+/g, '_');

    // 랜덤 문자열을 생성하고 u_id와 결합하여 파일 이름 생성
    const randomString = generateRandomString(8);
    const fileName = `${sanitizedMenuName}_${randomString}.jpg`;

    return fileName;
  };

  // 이미지 추가
  // 이미지 추가
  const onChangeImg = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (e.target.files) {
      const uploadFile = e.target.files[0];

      const fileName = generateFileName(inputs.u_id);

      formData.append('file', uploadFile, fileName);

      if (!fileExtensionValid(uploadFile)) {
        e.target.value = '';
        message.error(
          `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
        )
        return;
      }

      if (uploadFile.size > FILE_SIZE_MAX_LIMIT) {
        e.target.value = '';
        message.error("업로드 가능한 최대 용량은 10MB입니다.")
        return;
      }
      setReview_img(uploadFile);
      setPreviewImg(uploadFile);
      console.log(uploadFile);
    }
  }

  return (
    <>
      <div id="head" className={MenuStyle.head}>
        <Link className={MenuStyle.link} to="/myOrderList">
          <BiArrowBack className={MenuStyle.faArrowLeft} />
        </Link>
        <img id="logo" className={MenuStyle.logo} src={ysuLogo} alt={"logo"} />
        <Link className={MenuStyle.link} to="/cart">
          <IoCartSharp className={MenuStyle.faCartShopping} />
        </Link>
      </div>
      <form className={RwStyle.reviewForm}>
        <div className={RwStyle.menuDetail}>
          {section && (
            <div id={section['menu_corner']}>
              <img id="menuDetailImg" className={RwStyle.menuDetailImg} src={require(`../../img/${decodeURIComponent(section['menu_image'])}`)} alt={section['menu_name']} />
              <div className={RwStyle.menuDetailName}>{section['menu_name']}</div>
            </div>

          )}
          <div>
            <Rate
              className={RwStyle.reviewRate}
              value={review_star}
              onChange={handleStarChange} />
          </div>
          <div>
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="리뷰를 작성해주세요."
              name="review_writing"
              onChange={onChange}
              style={{ height: 100 }} />

          </div>
          <div className={RwStyle.imgWrap}>
        
          {review_img ? (
            <>
            <div className={RwStyle.imgBox}>
              <img
                className={RwStyle.previewImg}
                src={URL.createObjectURL(new Blob([review_img]))} />
                </div>
              <button className={RwStyle.deleteBtn} onClick={deleteImgHandler}>x</button>
            </>
          ) : (
            <><label htmlFor="imgUpload"><img className={RwStyle.imgAdd} src={imageAdd} />
              <input
                type="file"
                accept="image/*"
                id="imgUpload"
                onChange={onChangeImg}
                className={RwStyle.reviewFile}
              />
            </label>
            </>
          )}
          </div>
          <div className={RwStyle.reviewWriteBtnWrapper}>
            <button className={RwStyle.reviewWriteBtn} onClick={handleFormSubmit}>
              리뷰 등록
            </button>
          </div>
        </div>

      </form >
    </>
  );
};

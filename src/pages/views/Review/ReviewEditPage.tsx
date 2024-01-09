import { Button, Input, Rate, message } from "antd";
import axios from "axios";
import { useState } from "react"
import { useParams } from "react-router-dom"
import { IProps } from "./ReviewWritePage";
import { MenuDetail } from "../MenuDetail";

export const ReviewEditPage = (detail: IProps['detail']): JSX.Element=> {

    const { review_id } = useParams();
    console.log(review_id);

    const [review_writing, setReviewWriting] = useState(detail.review_writing);
    const [review_star, setReviewStar] = useState(detail.review_star);

    const handleEditSubmit =(e:any) => {
        axios
        .put(`/menu/review/${review_id}/write`, {review_writing, review_star})
        .then(() => {
            message.success('리뷰가 수정되었습니다.')
            console.log('리뷰 수정 성공')
        })
        .catch((error) => {
            message.error('리뷰 수정에 실패하였습니다.')
            console.error(error);
        });
    
    }
       
    return(
    <>
    <MenuDetail/>
    <div>
        <Input.TextArea
            placeholder="리뷰를 작성해주세요."
            value={detail.review_writing}
            name="review_writing"
            onChange={(e) => setReviewWriting(e.target.value)}
        />
        <Rate
        value={detail.review_star}
          onChange={(value) => {setReviewStar(value)}}
        />
        <Button type="primary" onClick={handleEditSubmit}>
        리뷰 수정
      </Button>
    </div>
    </>
    )
}
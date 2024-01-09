package com.example.ysu.model.dao;

import com.example.ysu.model.dto.InsertReviewDTO;
import com.example.ysu.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ReviewDAO {

    List<ReviewDTO> getMyReviews(String u_id);

    List<ReviewDTO> reviewList(Integer menu_id);

    void reviewInsert(InsertReviewDTO reviewDTO);

    // public void reviewUpdate(ReviewDTO reviewDTO);

    void reviewDelete(@Param("review_id")Integer review_id, @Param("u_id") String u_id);

}

package com.example.ysu.model.dao;

import com.example.ysu.model.dto.InsertReviewDTO;
import com.example.ysu.model.dto.ReviewDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
@Mapper
public class InsertReviewDAO {
    @Autowired
    private SqlSession sqlSession;

    public void reviewInsertData(ReviewDTO reviewDTO){
        sqlSession.insert("com.example.ysu.model.dao.ReviewDAO.reviewInsert", reviewDTO);
    }
}

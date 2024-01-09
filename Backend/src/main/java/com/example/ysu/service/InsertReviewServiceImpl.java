package com.example.ysu.service;

import com.example.ysu.model.dao.InsertReviewDAO;
import com.example.ysu.model.dao.ReviewDAO;
import com.example.ysu.model.dto.InsertReviewDTO;
import com.example.ysu.model.dto.ReviewDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsertReviewServiceImpl implements InsertReviewService{
    private final InsertReviewDAO insertReviewDAO;

    @Autowired
    public InsertReviewServiceImpl(InsertReviewDAO insertReviewDAO){
        this.insertReviewDAO=insertReviewDAO;
    }

    @Override
    public void reviewInsert(ReviewDTO reviewDTO) {
        insertReviewDAO.reviewInsertData(reviewDTO);
    }
}
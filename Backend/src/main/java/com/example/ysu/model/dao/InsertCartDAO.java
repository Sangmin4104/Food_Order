package com.example.ysu.model.dao;

import com.example.ysu.model.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public class InsertCartDAO {
    @Autowired
    private SqlSession sqlSession;

    public void insertData(CartDTO cartDTO) {
        sqlSession.insert("com.example.ysu.model.dao.CartDAO.InsertCart", cartDTO);
    }
}
package com.example.ysu.model.dao;

import com.example.ysu.model.dto.MenuDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public class InsertMenuDAO {
    @Autowired
    private SqlSession sqlSession;

    public void insertData(MenuDTO menuDTO) {
        sqlSession.insert("com.example.ysu.model.dao.MenuDAO.MenuInsert", menuDTO);
    }

    public void updateData(MenuDTO menuDTO) {
        sqlSession.update("com.example.ysu.model.dao.MenuDAO.MenuUpdate", menuDTO);
    }

    public MenuDTO getMenuById(int menu_id) {
        return sqlSession.selectOne("com.example.ysu.model.dao.MenuDAO.getMenuById", menu_id);
    }
}

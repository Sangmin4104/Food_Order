package com.example.ysu.model.dao;

import com.example.ysu.model.dto.MenuDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MenuDAO {

    MenuDTO getMenuById(Long menuId);

    void MenuInsert(MenuDTO mto);
    void MenuUpdate(MenuDTO mto);

    List<MenuDTO> AdminMenuList();

    List<MenuDTO> UserMenuList();

    List<MenuDTO> AdminLastMenuList();

}

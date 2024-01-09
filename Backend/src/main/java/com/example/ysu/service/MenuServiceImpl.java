package com.example.ysu.service;

import com.example.ysu.model.dao.InsertMenuDAO;
import com.example.ysu.model.dao.MenuDAO;
import com.example.ysu.model.dto.MenuDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    private final MenuDAO menuDAO;
    private final InsertMenuDAO insertMenuDAO;

//    @Autowired
//    public MenuServiceImpl(MenuDAO menuDAO, InsertMenuDAO insertMenuDAO) {
//        this
//        this.insertMenuDAO = insertMenuDAO;
//    }

    @Override
    public MenuDTO getMenuById(Long menuId) {
        return menuDAO.getMenuById(menuId);
    }

    @Override
    public MenuDTO getMenuByIdUpdate(int menuId) {
        return insertMenuDAO.getMenuById(menuId);
    }

    @Override
    public List<MenuDTO> AdminMenuList(){
        return menuDAO.AdminMenuList();
    }

    @Override
    public List<MenuDTO> UserMenuList(){
        return menuDAO.UserMenuList();
    }

    @Override
    public List<MenuDTO> AdminLastMenuList(){
        return menuDAO.AdminLastMenuList();
    }

    @Override
    public void MenuInsert(MenuDTO menuDTO) {
        insertMenuDAO.insertData(menuDTO);
    }

    @Override
    public void MenuUpdate(MenuDTO menuDTO) {
        insertMenuDAO.updateData(menuDTO);
    }


}
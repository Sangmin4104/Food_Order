package com.example.ysu.service;

import com.example.ysu.model.dto.MenuDTO;

import java.util.List;

public interface MenuService {
    MenuDTO getMenuById(Long menuId);
    MenuDTO getMenuByIdUpdate(int menuId);
    void MenuInsert(MenuDTO menuDTO);
    void MenuUpdate(MenuDTO menuDTO);

    public List<MenuDTO> AdminMenuList();

    public List<MenuDTO> UserMenuList();

    public List<MenuDTO> AdminLastMenuList();


}

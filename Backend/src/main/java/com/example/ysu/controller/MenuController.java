package com.example.ysu.controller;

import com.example.ysu.model.dto.MenuDTO;
import com.example.ysu.service.MenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class MenuController {
    private final MenuService menuService;
    // 사용자 메뉴
    @GetMapping("/menu")
    public List<MenuDTO> UserMenuList() { return menuService.UserMenuList(); }

    // 관리자 메뉴
    @GetMapping("/adminmenu")
    public List<MenuDTO> AdminMenuList() { return menuService.AdminMenuList(); }

    // 관리자 지난 메뉴
    @GetMapping("/lastmenu")
    public List<MenuDTO> AdminLastMenuList() { return menuService.AdminLastMenuList(); }

    @GetMapping("/menu/{menuid}")
    public MenuDTO menuById(@PathVariable Long menuid) {
        return menuService.getMenuById(menuid);
    }


    // 선택 메뉴 상세 정보
    @GetMapping("/adminmenu/menudetail/{menuid}")
    public MenuDTO adminMenuById(@PathVariable Long menuid) { return menuService.getMenuById(menuid); }

}

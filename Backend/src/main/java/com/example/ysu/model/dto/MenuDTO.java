package com.example.ysu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {
    private Integer menu_id;
    private String menu_name; // 메뉴 이름
    private String menu_corner; // 코너
    private Integer menu_price;
    private Integer menu_pack; // 포장 여부
    private String menu_image; // 음식 사진
    private Integer menu_sales; // 판매 가능 여부
    private Integer menu_regist; // 등록 여부
    private Date menu_date;
}
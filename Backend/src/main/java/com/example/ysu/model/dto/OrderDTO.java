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
public class OrderDTO {
    private int order_id;
    private String u_id;
    private Integer total_quantity;
    private Integer total_price;
    private String order_date;

    private Long order_detail_id;
    private Long is_packed;
    private Integer menu_id;
    private Integer quantity;

    private String menu_name; // 메뉴 이름
    private Integer menu_price;
    private String menu_corner; // 코너
    private String menu_image; // 음식 사진

    private Integer price;
    private Integer menu_pack; // 포장 여부
    private Integer menu_sales; // 판매 가능 여부
    private Integer menu_regist; // 등록 여부

}

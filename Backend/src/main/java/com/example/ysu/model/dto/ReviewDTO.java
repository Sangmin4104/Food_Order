package com.example.ysu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private String u_id;
    private String u_name;
    private int order_id;
    private int menu_id;
    private int review_id;
    private String review_img;
    private String review_writing;
    private int review_star;
    private String review_time;
    private int review_regist;
    private String menu_name;
    private String menu_corner;
    private int menu_price;
    private int menu_pack;
    private String menu_image;
    private String menu_sales;
    private int menu_regist;
    private int is_packed;

}

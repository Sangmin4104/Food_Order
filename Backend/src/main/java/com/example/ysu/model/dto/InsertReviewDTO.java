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
public class InsertReviewDTO {
    private String u_id;
    private String u_name;
    private Integer order_id;
    private Integer menu_id;
    private Integer review_id;
    private String review_writing;
    private Integer review_star;
    private Date review_time;
    private Integer review_regist;
    private String review_img;
}

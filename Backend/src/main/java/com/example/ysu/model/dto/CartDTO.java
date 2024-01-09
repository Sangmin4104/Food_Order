package com.example.ysu.model.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartDTO {
    private Integer menu_id;
    private String u_id;
    private Integer quantity;
    private String menu_name;
    private Integer menu_price;
    private String menu_corner;
    private String menu_image;
    private Integer is_packed;
    private Integer cart_price;
}
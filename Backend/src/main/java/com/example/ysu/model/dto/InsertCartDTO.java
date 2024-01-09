package com.example.ysu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InsertCartDTO {
    private Integer cart_id;
    private String u_id;
    private Integer menu_id;
    private Integer cart_count;
    private Integer is_packed;
}
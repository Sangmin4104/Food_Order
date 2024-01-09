package com.example.ysu.model.dao;

import com.example.ysu.model.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface CartDAO {

    List<CartDTO> CartList(String u_id);
    void CartDelete(@Param("menu_id") int menu_id, @Param("u_id") String u_id, @Param("is_packed") int is_packed);

    void CartUpdate(@Param("quantity") int quantity,
                    @Param("menu_id") int menu_id,
                    @Param("u_id") String u_id,
                    @Param("is_packed") int is_packed);

    void CartUpdate();

    void CartDrop(@Param("u_id") String u_id);
}

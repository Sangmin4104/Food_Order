package com.example.ysu.model.dao;

import com.example.ysu.model.dto.OrderDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface OrderDAO {

    List<OrderDTO> getMyOrders(String u_id);

    List<OrderDTO> OrderList(String u_id);
    List<OrderDTO> OrderDetailList(@Param("order_id") int order_id, @Param("u_id") String u_id);
    void OrderInsert(OrderDTO order);
    void orderInsertDAO(OrderDTO orderDTO);
}

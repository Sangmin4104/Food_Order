package com.example.ysu.service;

import com.example.ysu.model.dto.OrderDTO;

import java.util.List;

public interface OrderService {

    List<OrderDTO> getMyOrders(String u_id);

    public List<OrderDTO> OrderList(String u_id);

    public List<OrderDTO> OrderDetailList(int order_id, String u_id);

    void OrderInsert(OrderDTO order);
}

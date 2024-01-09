package com.example.ysu.controller;

import com.example.ysu.model.dto.OrderDTO;
import com.example.ysu.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class OrderController {
    private final OrderService orderService;
    @GetMapping("/myorders/{u_id}")
    public List<OrderDTO> selectMyOrders(@PathVariable String u_id) {
        return orderService.getMyOrders(u_id);
    }

    @GetMapping("/order/list/{u_id}")
    public List<OrderDTO> OrderList(@PathVariable String u_id) {
        return orderService.OrderList(u_id);
    }

    @GetMapping("/order/detail/{order_id}/{u_id}")
    public List<OrderDTO> OrderDetailList(@PathVariable int order_id, @PathVariable String u_id) {
        return orderService.OrderDetailList(order_id, u_id);
    }

    @PostMapping("/order/insert")
    public String orderInsert(@RequestBody OrderDTO order) {
        orderService.OrderInsert(order);
        System.out.println(order);
        return "redirect:/cart/list";
    }
}

package com.example.ysu.controller;

import com.example.ysu.model.dto.CartDTO;
import com.example.ysu.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestController
//@RequestMapping("/cart")
//@Slf4j
//@RequiredArgsConstructor

@RequiredArgsConstructor
@RestController
@Slf4j
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping("/cart/list/{u_id}")
    public List<CartDTO> CartList(@PathVariable String u_id) {
        System.out.println("hello");
        return cartService.CartList(u_id);
    }

    @DeleteMapping("/cart/delete/{menu_id}/{u_id}/{is_packed}")
    public String CartDelete(@PathVariable int menu_id, @PathVariable String u_id, @PathVariable int is_packed) {
        cartService.CartDelete(menu_id, u_id, is_packed);
        return "redirect:/cart/list";
    }

    @PutMapping("/cart/update/{u_id}")
    public String CartUpdate(@RequestBody List<CartDTO> Update, @PathVariable String u_id) {
        System.out.println(Update);
        cartService.CartUpdate(Update);
        return "redirect:/order/insert";
    }

    @DeleteMapping("/cart/drop/{u_id}")
    public String CartDrop(@PathVariable String u_id) {
        cartService.CartDrop(u_id);
        return "redirect:/order/insert";
    }
}
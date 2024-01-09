package com.example.ysu.controller;

import com.example.ysu.model.dto.CartDTO;
import com.example.ysu.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class InsertCartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/insertCart")
    public ResponseEntity<String> insertData(@RequestBody CartDTO cartDTO) {
        cartService.insertCart(cartDTO);
        return ResponseEntity.ok("Data inserted successfully");
    }
}
package com.example.ysu.service;

import com.example.ysu.model.dao.CartDAO;
import com.example.ysu.model.dao.InsertCartDAO;
import com.example.ysu.model.dto.CartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    private final CartDAO cartDAO;
    private final InsertCartDAO insertCartDAO;

    @Autowired
    public CartServiceImpl(CartDAO cartDAO, InsertCartDAO insertCartDAO) {
        this.cartDAO = cartDAO;
        this.insertCartDAO = insertCartDAO;
    }

    @Override
    public void insertCart(CartDTO cartDTO) {
        insertCartDAO.insertData(cartDTO);
    }

    @Override
    public List<CartDTO> CartList(String u_id) {
        return cartDAO.CartList(u_id);
    }

    @Override
    public void CartDelete(int menu_id, String u_id, int is_packed) {
        cartDAO.CartDelete(menu_id, u_id, is_packed);
    }

    @Override
    public void CartUpdate(List<CartDTO> cartList) {
        for (CartDTO cart : cartList) {
            int quantity = cart.getQuantity();
            int menuId = cart.getMenu_id();
            String userId = cart.getU_id();
            int is_packed = cart.getIs_packed();
            cartDAO.CartUpdate(quantity, menuId, userId, is_packed);
        }
    }
    @Override
    public void CartDrop(String u_id) {
        cartDAO.CartDrop(u_id);
    }
}

package com.example.ysu.controller;

import com.example.ysu.model.dto.InsertReviewDTO;
import com.example.ysu.model.dto.ReviewDTO;
import com.example.ysu.service.InsertReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/menu")
//@RequestMapping
public class InsertReviewController {
    @Autowired
    private InsertReviewService insertReviewService;

    private final String reviewImageUploadPath = "/Users/seoyoung/Documents/ysu/src/pages/img";

    @PostMapping("/review/write")
    public ResponseEntity<String> insertDataReview(
            @RequestParam("u_id") String u_id,
            @RequestParam("order_id") int order_id,
            @RequestParam("menu_id") int menu_id,
            @RequestParam("review_writing") String review_writing,
            @RequestParam("review_star") int review_star,
            @RequestParam(value = "review_img" , required = false) MultipartFile review_img
    ){
        try {
            String fileReviewName = saveImage(review_img);

            ReviewDTO reviewDTO = new ReviewDTO();
            reviewDTO.setU_id(u_id);
            reviewDTO.setOrder_id(order_id);
            reviewDTO.setMenu_id(menu_id);
            reviewDTO.setReview_writing(review_writing);
            reviewDTO.setReview_star(review_star);
            reviewDTO.setReview_img(fileReviewName);

            insertReviewService.reviewInsert(reviewDTO);
            return ResponseEntity.ok("Data successfully");
        } catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to insert data");
        }
    }
    private String saveImage(MultipartFile multipartFile) {
        if(multipartFile != null){
            try {
                String originalFileName = multipartFile.getOriginalFilename();
                String filePath = reviewImageUploadPath + File.separator + originalFileName;
                File dest = new File(filePath);
                multipartFile.transferTo(dest);
                return originalFileName;
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

}
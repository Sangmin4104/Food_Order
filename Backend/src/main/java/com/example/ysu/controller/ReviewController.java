package com.example.ysu.controller;

import com.example.ysu.model.dto.InsertReviewDTO;
import com.example.ysu.model.dto.ReviewDTO;
import com.example.ysu.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class ReviewController {
    private final ReviewService reviewService;
    @GetMapping("/myreviews/{u_id}")
    public List<ReviewDTO> selectMyReviews(@PathVariable String u_id) {
        return reviewService.getMyReviews(u_id);
    }

    @GetMapping("/menu/{menu_id}/review")
    public List<ReviewDTO> reviewList(@PathVariable Integer menu_id) {
        return reviewService.reviewList(menu_id);
    }

    // 리뷰 추가
//    @PostMapping("/menu/review/write")
//    public ResponseEntity<List<InsertReviewDTO>> reviewInsert(@RequestBody ReviewDTO reviewDTO) {
//        reviewService.reviewInsert(reviewDTO);
//        System.out.print(reviewDTO);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @DeleteMapping("/review/delete/{review_id}/{u_id}")
    public String reviewDelete(@PathVariable Integer review_id, @PathVariable String u_id) {
        reviewService.reviewDelete(review_id, u_id);
        return "redirect:/menu";
    }
}

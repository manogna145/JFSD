package com.klef.jfsd.sdp.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.klef.jfsd.sdp.model.All;
import com.klef.jfsd.sdp.model.Diet;
import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.model.UserDietRetrival;
import com.klef.jfsd.sdp.repository.DietRepository;
import com.klef.jfsd.sdp.repository.FoodRepository;

@Service
public class DietServiceImpl implements DietService {
    
    @Autowired
    DietRepository dietrepository;
    
    @Autowired
    FoodRepository foodRepository;

    @Override
    public ResponseEntity<Void> UpdateDiet(All all) {
        try {
            Diet d = new Diet();
            d.setDate(LocalDate.now());
            d.setTime(all.getTime());
            d.setUid(all.getUid());
            d.setFid(all.getFid());
            d.setQuantity(all.getQuantity());
            
            d.setMealType(getMealTypeFromTime(all.getTime().toString()));
            
            System.out.println(d.toString());

            dietrepository.save(d);
            
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    public String getMealTypeFromTime(String time) {
        LocalTime localTime = parseTime(time);
        
        if (localTime.isAfter(LocalTime.of(11, 59)) && localTime.isBefore(LocalTime.of(15, 0))) {
            return "Lunch";  
        } else if (localTime.isAfter(LocalTime.of(17, 59)) && localTime.isBefore(LocalTime.of(23, 0))) {
            return "Dinner";  
        } else if (localTime.isBefore(LocalTime.of(11, 59))&&localTime.isAfter(LocalTime.of(4, 00))) {
            return "Breakfast"; 
        } else {
            return "snacks"; 
        }
    }

    public LocalTime parseTime(String time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm"); // 24-hour format
        return LocalTime.parse(time, formatter);
    }

    @Override
    public List<UserDietRetrival> getuserdiet(int id) {
        List<Diet> userdiet = dietrepository.findAllByUid(id);
        List<UserDietRetrival> userDietList = new ArrayList<>();
        
        for (Diet diet : userdiet) {
        	if(foodRepository.existsById(diet.getFid())) {
            UserDietRetrival userDietRetrival = new UserDietRetrival();
            userDietRetrival.setFid(diet.getFid());
            userDietRetrival.setMealType(diet.getMealType());
            userDietRetrival.setQuantity(diet.getQuantity());
            
            Optional<Food> foodOptional = foodRepository.findById(diet.getFid());
            if (foodOptional.isPresent()) {
                Food food = foodOptional.get();
                userDietRetrival.setName(food.getName());
                userDietRetrival.setCalories(food.getCalories());
                userDietRetrival.setFat(food.getFat());
                userDietRetrival.setProtein(food.getProtein());
                userDietRetrival.setCarbohydrates(food.getCarbohydrates());
            } else {
                throw new RuntimeException("Food not found for fid: " + diet.getFid());
            }

            userDietList.add(userDietRetrival);
        	}
        }
        
        return userDietList;
    }
    


}

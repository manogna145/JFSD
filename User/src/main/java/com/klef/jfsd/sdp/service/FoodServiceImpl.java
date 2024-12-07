package com.klef.jfsd.sdp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.repository.FoodRepository;

@Service
public class FoodServiceImpl implements FoodService{
	
	@Autowired
	FoodRepository foodrepository;
	
	@Override
	public Food addfood(Food food, MultipartFile image) throws IOException {
		food.setImageName(image.getOriginalFilename()); 
		food.setImageType(image.getContentType()); 
		food.setImageData(image.getBytes()); 
		return foodrepository.save(food);
	}
	@Override
	public Food getbyid(int id)
	{
		
		return foodrepository.findById(id).get();
	}

	@Override
	public List<Food> viewallfoods() {
		
		return foodrepository.findAll()	;
	}

	@Override
	public Food editfood(Food food, MultipartFile image) throws IOException {
//		System.out.println(food.getFid());
		Food temp = foodrepository.findById(food.getFid()).get();
		System.out.println(temp.toString());
		temp.setCalories(food.getCalories());
		temp.setCarbohydrates(food.getCarbohydrates());
		temp.setFat(food.getFat());
		temp.setName(food.getName());
		temp.setProtein(food.getProtein());
		if(image!=null) {
		temp.setImageName(image.getOriginalFilename()); 
		temp.setImageType(image.getContentType()); 
		temp.setImageData(image.getBytes());
		}
		
		
		
	return	foodrepository.save(temp);
		
		
		
	}
	@Override
	public void deletefoodbyid(int id) {
		
		 foodrepository.deleteById(id);
	}

}

package com.klef.jfsd.sdp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Food;

public interface FoodService {
	
	public Food addfood(Food food, MultipartFile image) throws IOException;
	public Food getbyid(int id);
	public List<Food> viewallfoods();
	public Food editfood(Food food, MultipartFile image) throws IOException;
	public void deletefoodbyid(int id);

}

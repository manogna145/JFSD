package com.klef.jfsd.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.service.FoodServiceImpl;

@Controller
@RequestMapping("/food")
public class FoodController {
	
	@Autowired
	FoodServiceImpl foodservice;
	
	@PostMapping("/addfood")
	public ResponseEntity<?> addfood(@RequestPart("food") Food food, @RequestPart("image") MultipartFile image)
	{
		try {
		Food f=foodservice.addfood(food,image);
		return new ResponseEntity<>("Food Added Successfully",HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	

	@PostMapping("/editfood")
	public ResponseEntity<Void> editfood(@RequestPart("food") Food food, @RequestPart(value="image",required = false) MultipartFile image)
	{
		try {
			System.out.print(food.getFid());
		foodservice.editfood(food,image);
		return new ResponseEntity<>(HttpStatus.CREATED);
		}
		catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	@PostMapping("/deletefoodbyid/{id}")
	public ResponseEntity<?> deletefoodbyid(@PathVariable int id)
	{
		try {
			foodservice.deletefoodbyid(id);
			System.out.print("API Called");
			return new ResponseEntity<>(HttpStatus.OK);

		}
		catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("viewallfoods")
	public ResponseEntity<List<Food>> viewallfoods()
	{
		List<Food> foods=foodservice.viewallfoods();
		return new ResponseEntity<>(foods,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getimagebyid/{id}")
	public ResponseEntity<byte[]> getimagebyid(@PathVariable int id)
	{
		Food food=foodservice.getbyid(id);
		byte[] image=food.getImageData();
		
		return ResponseEntity.ok().
				contentType(MediaType.valueOf(food.getImageType()))
				.body(image);
	}

}

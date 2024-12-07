package com.klef.jfsd.sdp.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Exercise;
import com.klef.jfsd.sdp.service.ExerciseServiceImpl;

@Controller
@RequestMapping("exercise")
public class ExerciseController {
	
	@Autowired
	ExerciseServiceImpl exerciseServiceImpl;
	
	
	@PostMapping("/addexercise")
	public ResponseEntity<Void> addExercise(@RequestPart("exercise") Exercise exercise,@RequestPart("image") MultipartFile image)
	{
	
		return exerciseServiceImpl.addExercise(exercise,image); 
		
	}
	
	
	@PostMapping("/editexercise")
	public ResponseEntity<Void> editExercise(@RequestPart("exercise") Exercise exercise,@RequestPart(value="image",required=false) MultipartFile image) throws IOException
	{
	
		return exerciseServiceImpl.editExercise(exercise,image); 
		
	}	
	
	@GetMapping("/viewallexercises")
	public ResponseEntity<List<Exercise>> viewallexercises()
	{
		return exerciseServiceImpl.getAllExercises();
	}
	
	
	
	@PostMapping("deleteexercisebyid/{id}")
	public ResponseEntity<Void> deleteExercise(@PathVariable int id)
	{
		return exerciseServiceImpl.deleteExercise(id);
	}
	
	
	
	
	
	
	
	

}

package com.klef.jfsd.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klef.jfsd.sdp.model.ExerciseInput;
import com.klef.jfsd.sdp.model.UserExerciseRetrieval;
import com.klef.jfsd.sdp.service.UserExerciseMapService;

@Controller
@RequestMapping("userexercise")
public class UserExerciseMapController {
	
	@Autowired
	UserExerciseMapService exerciseMapService;
	
	@PostMapping("/updateexercise")
	public ResponseEntity<Void> editExercise(@RequestBody ExerciseInput e){
		
		return exerciseMapService.updateExercise(e); 
		
	}
	
	@GetMapping("/getExercise/{uid}")
	public ResponseEntity<List<UserExerciseRetrieval>> getUserExercise(@PathVariable("uid") int  id)
	{
		return exerciseMapService.getUserExercise(id);
	}
	
	

}

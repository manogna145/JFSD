package com.klef.jfsd.sdp.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.klef.jfsd.sdp.model.Exercise;
import com.klef.jfsd.sdp.model.ExerciseInput;
import com.klef.jfsd.sdp.model.UserExerciseMap;
import com.klef.jfsd.sdp.model.UserExerciseRetrieval;
import com.klef.jfsd.sdp.repository.ExerciseRepository;
import com.klef.jfsd.sdp.repository.UserExerciseMapRepository;

@Service
public class UserExerciseMapServiceImpl implements UserExerciseMapService{
	
	@Autowired
	UserExerciseMapRepository exerciseMapRepository;
	
	@Autowired
	ExerciseRepository exerciseRepository;

	@Override
	public ResponseEntity<Void> updateExercise(ExerciseInput exerciseInput) {
	    try {
	    	
	        UserExerciseMap userExerciseMap = new UserExerciseMap();
	        userExerciseMap.setDate(LocalDate.now()); 
	        userExerciseMap.setUid(exerciseInput.getUid()); 
	        userExerciseMap.setEid(exerciseInput.getEid()); 
	        userExerciseMap.setNumberofmin(exerciseInput.getNumberofmin()); 

	        exerciseMapRepository.save(userExerciseMap);

	        return new ResponseEntity<>(HttpStatus.ACCEPTED);
	    } catch (Exception e) {
	        System.out.println("Error updating exercise: " + e.getMessage());
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@Override
	public ResponseEntity<List<UserExerciseRetrieval>> getUserExercise(int id) {
		try {
	    List<UserExerciseMap> userExercises = exerciseMapRepository.findAllByUid(id);
	    List<UserExerciseRetrieval> userExerciseList = new ArrayList<>();

	    for (UserExerciseMap userExerciseMap : userExercises) {
	        UserExerciseRetrieval userExerciseRetrieval = new UserExerciseRetrieval();
	        userExerciseRetrieval.setNumberofmin(userExerciseMap.getNumberofmin()); 
	        
	        Optional<Exercise> exerciseOptional = exerciseRepository.findById(userExerciseMap.getEid());
	        if (exerciseOptional.isPresent()) {
	            Exercise exercise = exerciseOptional.get();
	            userExerciseRetrieval.setExerciseType(exercise.getExerciseType());
	            userExerciseRetrieval.setCalorieBurn(exercise.getCalorieBurn());
	        } else {
	            throw new RuntimeException("Exercise not found for eid: " + userExerciseMap.getEid());
	        }

	        userExerciseList.add(userExerciseRetrieval);
	    }


	    return new ResponseEntity<>(userExerciseList,HttpStatus.OK);
		}
		catch(Exception e)
		{
			System.out.print(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}


}

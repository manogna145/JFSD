package com.klef.jfsd.sdp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.klef.jfsd.sdp.model.ExerciseInput;
import com.klef.jfsd.sdp.model.UserExerciseMap;
import com.klef.jfsd.sdp.model.UserExerciseRetrieval;

public interface UserExerciseMapService {
	
	public ResponseEntity<Void> updateExercise(ExerciseInput u);
	public ResponseEntity<List<UserExerciseRetrieval>> getUserExercise(int id);

}

package com.klef.jfsd.sdp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Exercise;

public interface ExerciseService {
	
	public ResponseEntity<Void> addExercise(Exercise exercise,MultipartFile image);
	public ResponseEntity<List<Exercise>> getAllExercises();
	public ResponseEntity<Void> editExercise(Exercise exercise,MultipartFile image) throws IOException;
	public ResponseEntity<Void> deleteExercise(int id);




}

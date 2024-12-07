package com.klef.jfsd.sdp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.sdp.model.Exercise;
import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.repository.ExerciseRepository;

@Service
public class ExerciseServiceImpl implements ExerciseService{
	
	@Autowired
	ExerciseRepository exerciseRepository;
	
	public ResponseEntity<Void> addExercise(Exercise exercise,MultipartFile image)
	{
		try {
			exercise.setImageName(image.getOriginalFilename()); 
			exercise.setImageType(image.getContentType()); 
			exercise.setImageData(image.getBytes()); 
			exerciseRepository.save(exercise);
			
			return new ResponseEntity<>(HttpStatus.ACCEPTED);

		}
		catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<List<Exercise>> getAllExercises() {
		// TODO Auto-generated method stub
		
		return new ResponseEntity<>( exerciseRepository.findAll(),HttpStatus.ACCEPTED);
	}

	@Override
	public ResponseEntity<Void> editExercise(Exercise exercise,MultipartFile image) throws IOException {
		// TODO Auto-generated method stub
		try {
		Exercise temp = exerciseRepository.findById(exercise.getEid()).get();
		System.out.println(temp.toString());
		temp.setCalorieBurn(exercise.getCalorieBurn());
		temp.setEid(exercise.getEid());
		
		if(image!=null) {
		temp.setImageName(image.getOriginalFilename()); 
		temp.setImageType(image.getContentType()); 
		temp.setImageData(image.getBytes());
		}
		 exerciseRepository.save(temp);
		 
			return new ResponseEntity<>(HttpStatus.ACCEPTED);

		}
		catch(Exception e)
		{
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

		}
	}

	@Override
	public ResponseEntity<Void> deleteExercise(int id) {
		// TODO Auto-generated method stub
		exerciseRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.ACCEPTED);
	}

}

package com.klef.jfsd.sdp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.klef.jfsd.sdp.model.All;
import com.klef.jfsd.sdp.model.Diet;
import com.klef.jfsd.sdp.model.UserDietRetrival;

public interface DietService {
	
	public ResponseEntity<Void> UpdateDiet(All all);
	public String getMealTypeFromTime(String time);
	public List<UserDietRetrival> getuserdiet(int id);


}

package com.klef.jfsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.sdp.model.Food;

@Repository
public interface FoodRepository extends JpaRepository<Food, Integer> {
	
	

}

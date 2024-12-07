package com.klef.jfsd.sdp.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.sdp.model.Diet;
import com.klef.jfsd.sdp.model.UserDietRetrival;

@Repository
public interface DietRepository extends JpaRepository<Diet, Integer>{
	
	public List<Diet> findAllByUid(int id); 
	
	public List<Diet> findAllByUidAndDate(int id, LocalDate date); 


}

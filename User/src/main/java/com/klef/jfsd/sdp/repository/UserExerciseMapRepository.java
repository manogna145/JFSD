package com.klef.jfsd.sdp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.sdp.model.UserExerciseMap;

@Repository
public interface UserExerciseMapRepository extends JpaRepository<UserExerciseMap, Integer>{
	
	public List<UserExerciseMap> findAllByUid(int id);

}

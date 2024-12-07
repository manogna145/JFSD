package com.klef.jfsd.sdp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.sdp.model.User;

@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
	
	
	Optional<User> findByUsername(String name);
    User findByUsernameAndPassword(String username, String password);
    void deleteByUsername(String username);
}

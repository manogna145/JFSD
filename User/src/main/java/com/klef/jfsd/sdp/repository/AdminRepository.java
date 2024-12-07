package com.klef.jfsd.sdp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.sdp.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, String>{
	
    Admin findByUsernameAndPassword(String username, String password);

	Admin findByUsername(String username);

}

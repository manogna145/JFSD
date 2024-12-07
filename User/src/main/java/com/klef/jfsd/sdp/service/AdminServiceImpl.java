package com.klef.jfsd.sdp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.klef.jfsd.sdp.model.Admin;
import com.klef.jfsd.sdp.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService{
	@Autowired
	public AdminRepository adminrepository;
	@Override
    public ResponseEntity<Void> login(String username, String password) {
		
        Admin u = adminrepository.findByUsernameAndPassword(username, password);

        if (u != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

	
}

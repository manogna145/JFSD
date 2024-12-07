package com.klef.jfsd.sdp.service;

import org.springframework.http.ResponseEntity;


	public interface AdminService {
		public ResponseEntity<Void> login(String username, String password);
	}

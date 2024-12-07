package com.klef.jfsd.sdp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klef.jfsd.sdp.model.Admin;
import com.klef.jfsd.sdp.service.AdminService;

@Controller
@RequestMapping("admin")
public class AdminController 
{
	
	@Autowired
	public AdminService adminservice;
	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody com.klef.jfsd.sdp.model.Admin admin)
	{
		return adminservice.login(admin.getUsername(), admin.getPassword());
	}


}

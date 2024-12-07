package com.klef.jfsd.sdp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.klef.jfsd.sdp.model.User;
import com.klef.jfsd.sdp.service.UserServiceImpl;

@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	UserServiceImpl userservice;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody User user)
	{
		return userservice.register(user);
	}
	
	
	
	@PostMapping("/login")
	public ResponseEntity<Void> login(@RequestBody User user)
	{
		return userservice.login(user.getUsername(), user.getPassword());
	}
	
	@GetMapping("/getuserdata/{name}")
	public ResponseEntity<User> getuserdata(@PathVariable("name") String name)
	{
		return userservice.getuserdata(name);
	}
	
	@GetMapping("/viewallusers")
	public ResponseEntity<List<User>> viewallusers()
	{
		return userservice.viewallusers();
	}
	
	
	
	@PostMapping("/deleteuser/{uid}")
	  public ResponseEntity<Void> deleteuser(@PathVariable("uid") int id)
	  {
	    return userservice.delteuser(id);
	  }

	@PutMapping("/update")
    public ResponseEntity<Void> updateUser(@RequestBody User user) {
        return userservice.updateprofile(user);
    }

}

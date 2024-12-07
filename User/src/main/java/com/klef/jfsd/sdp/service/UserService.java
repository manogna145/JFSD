package com.klef.jfsd.sdp.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.model.User;

public interface UserService {
  
  public ResponseEntity<User> viewbyid(int id);
  public ResponseEntity<Void> login(String username,String password);
  public ResponseEntity<Void> updateprofile(User user);
  public ResponseEntity<Void> updatediet(Food food);
  public ResponseEntity<String> register(User user);
  public ResponseEntity<List<User>> viewallusers();
  public ResponseEntity<Void> delteuser(int id);
 

  

}

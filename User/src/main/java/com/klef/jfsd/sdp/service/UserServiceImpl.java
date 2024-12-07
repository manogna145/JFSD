package com.klef.jfsd.sdp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.klef.jfsd.sdp.model.Food;
import com.klef.jfsd.sdp.model.User;
import com.klef.jfsd.sdp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
  
  @Autowired
  UserRepo userRepo;

  @Override
  public ResponseEntity<User> viewbyid(int id) {
      
     Optional<User> user = userRepo.findById(id);
     if(user.isPresent()) { 
      return new ResponseEntity<>(user.get(),HttpStatus.OK);
    
    }
    else {
      User d1=new User();
      return  new ResponseEntity<>(d1,HttpStatus.NOT_FOUND);
    }

  }

  @Override
    public ResponseEntity<Void> login(String username, String password) {
        User u = userRepo.findByUsernameAndPassword(username, password);

        if (u != null) {
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }


  @Override
  public ResponseEntity<Void> updateprofile(User user) {
      try {
          User existingUser = userRepo.findById(user.getUid())
              .orElseThrow(() -> new RuntimeException("User not found"));
          existingUser.setPhoneNumber(user.getPhoneNumber());
          existingUser.setAddress(user.getAddress());
          existingUser.setHeight(user.getHeight());
          existingUser.setWeight(user.getWeight());
          userRepo.save(existingUser);
          return ResponseEntity.ok().build();
      } catch (Exception e) {
          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
      }
  }

  @Override
  public ResponseEntity<Void> updatediet(Food food) {
    // TODO Auto-generated method stub
    return null;
  }
  
  public ResponseEntity<User> getuserdata(String name)
  {
Optional<User> user = userRepo.findByUsername(name);
        
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
       
  }

  @Override
  public ResponseEntity<String> register(User user) {
    
    try {
      userRepo.save(user);
      return new ResponseEntity<>("User Added Successfully",HttpStatus.OK);
    }
    catch(Exception e)
    {
      return new ResponseEntity<>("Some thing went wrong",HttpStatus.INTERNAL_SERVER_ERROR);

    }
    
    
  }

  @Override
  public ResponseEntity<List<User>> viewallusers() {
    // TODO Auto-generated method stub
//    return ResponseEntity.status(HttpStatus.OK).body(userRepo.findAll());
    
    return new ResponseEntity<>(userRepo.findAll(),HttpStatus.OK);
  }

  @Override
  public ResponseEntity<Void> delteuser(int id) {
    // TODO Auto-generated method stub
    try {
      
      userRepo.deleteById(id);
      
      return new ResponseEntity<>(HttpStatus.ACCEPTED);

      
    }
    catch(Exception e)
    {
      System.out.println(e.getMessage());
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

package com.klef.jfsd.sdp.model;

import java.util.Arrays;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "food_table")
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;
    private String name;
    private float calories;
    private float fat;
    private float protein;
    private float carbohydrates;


 
    
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	public String getImageType() {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	public byte[] getImageData() {
		return imageData;
	}
	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}
	public int getFid() {
		return fid;
	}
	public void setFid(int fid) {
		this.fid = fid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getCalories() {
		return calories;
	}
	public void setCalories(float calories) {
		this.calories = calories;
	}
	public float getFat() {
		return fat;
	}
	public void setFat(float fat) {
		this.fat = fat;
	}
	public float getProtein() {
		return protein;
	}
	public void setProtein(float protein) {
		this.protein = protein;
	}
	public float getCarbohydrates() {
		return carbohydrates;
	}
	public void setCarbohydrates(float carbohydrates) {
		this.carbohydrates = carbohydrates;
	}
//	public Diet getDiet() {
//		return diet;
//	}
//	public void setDiet(Diet diet) {
//		this.diet = diet;
//	}
//	@Override
//	public String toString() {
//		return "Food [fid=" + fid + ", name=" + name + ", calories=" + calories + ", fat=" + fat + ", protein="
//				+ protein + ", carbohydrates=" + carbohydrates + ", imageName=" + imageName + ", imageType=" + imageType
//				+ ", imageData=" + Arrays.toString(imageData) + "]";
//	}
    
    
}
